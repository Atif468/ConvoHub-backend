import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";
import { config } from "dotenv";
import fs from "fs";
import path from "path";
import bodyParser from "body-parser"; // Add for JSON parsing of base64

// Initialize environment variables
config();

// Initialize app and server
const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "10mb" })); // Increase limit for large files
const server = createServer(app);

// Serve static files for uploaded files
const uploadDir = path.resolve("uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
app.use("/uploads", express.static(uploadDir));

// Socket.io server setup
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// In-memory users object
let users = {};

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // User joins chat
  socket.on("join", (username) => {
    users[socket.id] = { id: socket.id, name: username };
    io.emit("userList", Object.values(users));
    socket.broadcast.emit("message", {
      user: "Server",
      text: `${username} has joined the chat`,
    });
  });

  // Private messaging
  socket.on("privateMessage", ({ text, to }) => {
    const fromUser = users[socket.id];
    if (fromUser && users[to]) {
      io.to(users[to].id).emit("privateMessage", { from: fromUser.name, text });
      socket.emit("privateMessage", { from: fromUser.name, text });
    }
  });

  // Typing notification
  socket.on("typing", (to) => {
    const fromUser = users[socket.id];
    if (fromUser && users[to]) {
      io.to(users[to].id).emit("typing", fromUser.name);
    }
  });

  // File sharing
  socket.on("send-file", (fileData) => {
    const { file, filename, to } = fileData;
    const fromUser = users[socket.id];

    if (!file || !filename || !fromUser || !users[to]) {
      socket.emit("error", "File transfer failed. Invalid data.");
      return;
    }

    const fileBuffer = Buffer.from(file.split(",")[1], "base64"); // Convert base64 to Buffer
    const filePath = path.join(uploadDir, `${Date.now()}_${filename}`);

    fs.writeFile(filePath, fileBuffer, (err) => {
      if (err) {
        console.error("File upload error:", err);
        socket.emit("error", "File upload failed");
        return;
      }

      const fileUrl = `/uploads/${path.basename(filePath)}`;

      const messageData = {
        from: fromUser.name,
        file: fileUrl,
        filename, // Send filename for frontend display
      };

      io.to(users[to].id).emit("privateMessage", messageData);
      socket.emit("privateMessage", messageData);
    });
  });

  // Disconnect event
  socket.on("disconnect", () => {
    const username = users[socket.id]?.name;
    delete users[socket.id];
    io.emit("userList", Object.values(users));
    socket.broadcast.emit("message", {
      user: "Server",
      text: `${username} has left the chat`,
    });
    console.log("User disconnected:", socket.id);
  });
});

// Start the server
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

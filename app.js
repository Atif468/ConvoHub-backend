import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";
import { config } from "dotenv";
import fs from "fs";

// Initialize environment variables
config();

// Initialize app and server
const app = express();
app.use(cors());
const server = createServer(app);

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

  // User join event
  socket.on("join", (username) => {
    users[socket.id] = { id: socket.id, name: username };
    io.emit("userList", Object.values(users));
    socket.broadcast.emit("message", {
      user: "Server",
      text: `${username} has joined the chat`,
    });
  });

  // Private message event
  socket.on("privateMessage", ({ text, to }) => {
    const fromUser = users[socket.id];
    if (fromUser && users[to]) {
      const recipientSocket = users[to].id;
      io.to(recipientSocket).emit("privateMessage", { from: fromUser.name, text });
      socket.emit("privateMessage", { from: fromUser.name, text });
    }
  });

  // Typing event
  socket.on("typing", (to) => {
    const fromUser = users[socket.id];
    if (fromUser && users[to]) {
      const recipientSocket = users[to].id;
      io.to(recipientSocket).emit("typing", fromUser.name);
    }
  });

  // File upload handling
  socket.on("send-file", async (fileData) => {
    // Ensure fileData.file is a base64 string
    console.log("aaya");
    if (fileData.file && typeof fileData.file === "string") {
      // Decode base64 file and save it to disk
      const fileBuffer = await Buffer.from(fileData.file, 'base64');
      const filePath = `uploads/${Date.now()}_${fileData.filename}`;
  
      fs.writeFile(filePath, fileBuffer, (err) => {
        if (err) {
          socket.emit("error", "File upload failed");
          return;
        }
  
        const fileUrl = `/uploads/${filePath.split('/').pop()}`;
        const fromUser = users[socket.id];
        const recipientSocket = users[fileData.to].id;
        io.to(recipientSocket).emit("privateMessage", { from: fromUser.name, file: fileUrl });
        socket.emit("privateMessage", { from: fromUser.name, file: fileUrl });
      });
    } else {
      socket.emit("error", "Invalid file data received");
    }
  });
  

  // Code snippet handling (treated as text)
  socket.on("send-code", ({ code, to }) => {
    const fromUser = users[socket.id];
    if (fromUser && users[to]) {
      const recipientSocket = users[to].id;
      io.to(recipientSocket).emit("privateMessage", { from: fromUser.name, text: code });
      socket.emit("privateMessage", { from: fromUser.name, text: code });
    }
  });

  // User disconnect event
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

// Static file serving (for file downloads)
app.use("/uploads", express.static("uploads"));

// Start server
server.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});

// Error handling
server.on("error", (err) => {
  console.error("Server error:", err);
});

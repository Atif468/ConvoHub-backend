// server.js
import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";
import { config } from "dotenv";

const app = express();
app.use(cors());
config();

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

let users = {};

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

   socket.on("join", (username) => {
    users[socket.id] = { id: socket.id, name: username };
    io.emit("userList", Object.values(users));
    socket.broadcast.emit("message", { user: "Server", text: `${username} has joined the chat` });
});


   socket.on("privateMessage", ({ text, to }) => {
    const fromUser = users[socket.id];
    if (fromUser && users[to]) {
      const recipientSocket = users[to].id;
      io.to(recipientSocket).emit("privateMessage", { from: fromUser.name, text });
      socket.emit("privateMessage", { from: fromUser.name, text });
    }
  });

   socket.on("typing", (to) => {
    const fromUser = users[socket.id];
    if (fromUser && users[to]) {
      const recipientSocket = users[to].id;
      io.to(recipientSocket).emit("typing", fromUser.name);
    }
  });

   socket.on("disconnect", () => {
    const username = users[socket.id]?.name;
    delete users[socket.id];
    io.emit("userList", Object.values(users));
    socket.broadcast.emit("message", { user: "Server", text: `${username} has left the chat` });
    console.log("User disconnected:", socket.id);
  });
});

server.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});

server.on("error", (err) => {
  console.error("Server error:", err);
});

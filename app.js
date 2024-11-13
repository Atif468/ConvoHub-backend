import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";
import {config} from "dotenv";

const app = express();
app.use(cors());
config();

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

let users = {};

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join", (username) => {
    users[socket.id] = username;  
    io.emit("userList", Object.values(users));
    io.emit("message", {
      user: "Server",
      text: `${username} has joined the chat`,
    });
  });

  socket.on("message", (message) => {
    const user = users[socket.id];
    if (user) {
      io.emit("message", { user, text: message.text }); 
    }
  });

  socket.on("disconnect", () => {
    const username = users[socket.id];
    delete users[socket.id];
    io.emit("userList", Object.values(users));
    io.emit("message", {
      user: "Server",
      text: `${username} has left the chat`,
    });
    console.log("User disconnected:", socket.id);
  });
});

server.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});

server.on("error", (err) => {
  console.error("Server error:", err);
});

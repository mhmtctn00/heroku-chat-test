const express = require("express");
const socket = require("socket.io");

const app = express();
const server = app.listen(process.env.PORT || 3000);

app.use(express.static("../public"));

const io = socket(server);

io.on("connection", (socket) => {
  io.sockets.emit("chat", {
    sender: "Server",
    message: socket.handshake.query["sender"] + " Hoş Geldiniz.",
  });
  socket.on("chat", (data) => {
    io.sockets.emit("chat", data);
  });
  socket.on("typing", (data) => {
    socket.broadcast.emit("typing", data);
  });
});

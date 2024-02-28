const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const app = express();
const server = http.createServer(app);
const io = new Server(server);
const port = 3333;
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/src/index.html");
});

io.on("connection", (socket) => {
  console.log("user connected", socket.id);
  socket.on("disconnect", function () {
    console.log("user disconnected");
  });
  socket.on("message", (data) => {
    console.log("message", data);
    socket.emit("message", "Message Sent");
  });
});

server.listen(port, () => {
  console.log(`Server is running ${port}`);
});

const app = require("./app");
const fs = require("fs");
const socketIO = require("socket.io");
const http = require("http");
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const io = socketIO(server);

// make connection with user from server side
io.on("connection", (socket) => {
  console.log("New user connected");
  //emit message from server to user
  io.emit("newUserConnected", {
    user: socket.handshake,
  });
  console.log(socket.id);
  // listen for message from user
  socket.on("createMessage", (newMessage) => {
    io.emit("respone", {
      message: newMessage,
    });
  });

  socket.on("message", () => {});

  socket.onAny((event, ...args) => {
    console.log(event, args);
  });
  // when server disconnects from user
  socket.on("disconnect", () => {
    console.log("disconnected from user");
  });
});

server.listen(port, () => {
  console.log(
    `server running on port : ${port} url : http://localhost:${port}/`
  );
});

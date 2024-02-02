const app = require("./app");

const socketIO = require("socket.io");
const http = require("http");
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const io = socketIO(server);

// make connection with user from server side
io.on("connection", (socket) => {
  console.log("New user connected");
  //emit message from server to user
  socket.emit("newMessage", {
    from: "jen@mds",
    text: "hepppp",
  });

  // listen for message from user
  socket.on("createMessage", (newMessage) => {
    console.log("newMessage", newMessage);
    socket.emit("respone", {
      message: "Soja bsdk",
    });
  });

  // when server disconnects from user
  socket.on("disconnect", () => {
    console.log("disconnected from user");
  });
});

server.listen(port, () => {
  console.log(`server running on port : ${port}`);
});

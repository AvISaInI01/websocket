const app = require("./app");
const socketIO = require("socket.io");
const http = require("http");
const port = process.env.PORT || 3001;
const server = http.createServer(app);
const io = socketIO(server);

server.listen(port, () => {
  console.log(`  > Running socket on port: ${port}`);
});

io.on("connection", (socket) => {
  console.log(socket, "new user connected");

  socket.emit("newMessage", { message: "connection established" });
  socket.on("createMessage", (message) => {
    console.log(message);
  });
  socket.on("disconnect", () => {
    console.log("disconnected");
  });
});

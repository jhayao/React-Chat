const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRoutes");
const app = express();
const socket = require("socket.io");
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/message", messageRoutes);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connection established successfully"));

const server = app.listen(process.env.PORT || 5000, () => {
  console.log("Server is running on port: 5000");
});

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

global.onlineUser = new Map();

io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    global.onlineUser.set(userId, socket.id);
    console.log(global.onlineUser);
  });

  socket.on("send-message", (data) => {
    console.log(data);
    const sendUserSocket = global.onlineUser.get(data.receiver);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("receive-message", data.message);
    }
  });
  socket.on("new-user", (data) => {
    console.log(data);
    socket.broadcast.emit("user-connected", data);
  });
});

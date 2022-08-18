const express = require("express");
const cors = require("cors");
const connectDB = require("./db/db");
const socket = require("socket.io");
const { createServer } = require("http");
const { Server } = require("socket.io");
require("dotenv").config();
const authRoute = require("./routes/authRoute");
const messageRoute = require("./routes/messagesRoute");

// ------------- creating express app -----------------
const app = express();

// -------- middlewares ----------
app.use(cors());
app.use(express.json());

// -------------- Connecting to our MongoDb Database using mongoose ------------

connectDB();

// --------- Routes for Server -------------

app.use("/api/auth", authRoute);
app.use("/api/messages", messageRoute);



// ------- listening to our Express app --------
const server = app.listen(process.env.PORT || 8000, () => {
  console.log("Connected to Server");
});

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
  // console.log(socket.join);
  global.chatSocket = socket;

  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);

    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieved", data.msg);
    }
  });
});

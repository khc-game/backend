// libs
import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import "colors";

// routes
import charactersRouter from "./routes/chracter.router.js";
import authRouter from "./routes/auth.router.js";

// listeners
import disconnectListener from "./sockets/handlers/disconnect.js";
import playListener from "./sockets/handlers/play.js";
import cancelListener from "./sockets/handlers/cancel.js";
import resignListener from "./sockets/handlers/resign.js";
import selectModuleListener from "./sockets/handlers/selectModule.js";
import useModuleListener from "./sockets/handlers/useModule.js";

// config
import socketConfig from "./config/socket.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/characters", charactersRouter);
app.use("/api/auth", authRouter);

app.use((err, req, res, next) => {
  if (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

const server = http.createServer(app);
const io = new Server(server, socketConfig);

io.on("connection", async (socket) => {
  console.log("[connect]", socket.id);

  socket.emit("getUserId", socket.id);

  const withSocket = (handler) => {
    return (...args) => {
      return handler(io, socket, ...args);
    };
  };

  socket.on("disconnect", withSocket(disconnectListener));
  socket.on("play", withSocket(playListener));
  socket.on("cancel", withSocket(cancelListener));
  socket.on("resign", withSocket(resignListener));
  socket.on("module:select", withSocket(selectModuleListener));
  socket.on("module:use", withSocket(useModuleListener));
});

server.listen(5000, () => {
  console.log("\nServer is Running on 5000 port");
});

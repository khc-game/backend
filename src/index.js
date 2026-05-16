// libs
import express from 'express'
import cors from 'cors'
import http from 'http';
import { Server } from "socket.io"
import "colors";

// routes
import charactersRouter from './routes/chracter.router.js';

// listeners
import disconnectListener from './sockets/handlers/disconnect.js';
import playListener from './sockets/handlers/play.js'

// config
import socketConfig from './config/socket.js'

const app = express();
app.use(cors());

app.use("/api/characters", charactersRouter);

const server = http.createServer(app);
const io = new Server(server, socketConfig);

io.on("connection", async (socket) => {
  console.log("[connect]", socket.id);

  socket.emit("getUserId", socket.id);

  const withSocket = (handler) => {
    return (...args) => {
      return handler(io, socket, ...args);
    }
  };

  socket.on("disconnect", withSocket(disconnectListener));
  socket.on("play", withSocket(playListener));
  // socket.on("cancelPlay",  withSocket(cancelPlayListener));
  // socket.on("resign", withSocket(resignListener));
  // socket.on("selectPerson", withSocket(selectPersonListener));
  // socket.on("selectModule", withSocket(selectModuleListener));
  // socket.on("useModule", withSocket(useModuleListener));
});

server.listen(5000, () => {
  console.log("\nServer is Running on 5000 port");
});

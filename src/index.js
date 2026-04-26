// libs
import express from 'express'
import cors from 'cors'
import http from 'http';
import { Server } from "socket.io"
import "colors";

// controllers
import cancelPlayListener from './listeners/cancelPlay.listener.js'
import disconnectListener from './listeners/disconnect.listener.js';
import playListener from './listeners/play.listener.js'
import resignListener from './listeners/resign.listener.js'
import selectPersonListener from './listeners/selectPerson.listener.js'
import selectModuleListener from './listeners/selectModule.listener.js'
import useModuleListener from './listeners/useModule.listener.js'

// config
import socketConfig from './config/socket.js'

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, socketConfig);

globalThis.io = io;

io.on("connection", async (socket) => {
  console.log("--------[connect]");
  console.log("A user connected", socket.id);

  socket.emit("getUserId", socket.id);

  const withSocket = (handler) => {
    return (...args) => {
      return handler(socket, ...args);
    }
  };

  socket.on("play", withSocket(playListener));
  socket.on("cancelPlay", withSocket(cancelPlayListener));
  socket.on("disconnect", withSocket(disconnectListener));
  socket.on("resign", withSocket(resignListener));
  socket.on("selectPerson", withSocket(selectPersonListener));
  socket.on("selectModule", withSocket(selectModuleListener));
  socket.on("useModule", withSocket(useModuleListener));
});

server.listen(5000, () => {
  console.log("\nServer is Running");
});

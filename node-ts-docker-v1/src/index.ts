import express from 'express';
import * as http from "http"; // We import http for init the server

import mongoConnect from './config/mongo';
import { SocketService } from "./services"; // We import our SocketService, Thanks to the index.ts file, we don't need to specify where exactly the Socket.ts file is located.

const app = express();
const server = http.createServer(app); // Init server avec use express as listener
const port = process.env.PORT || 8000;
const mongoURL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/test";
const socketService = new SocketService(server); // We instantiate our SocketService

app.use(express.json())

mongoConnect({ db: mongoURL });

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html"); // We Will use the index.html file to see our work
});

socketService.listenStore(); // We ask to our service to listen the change of the "Observable" data and emit the change to our socket by the "numberOfUser" event.

socketService.listenUserActivity(); // We listen the activity of the socket and change the state of the "Observable" data when a desired event is triggered ("connection" or "disconnect")

server.listen(port, () => {
  return console.log(`server is listening on ${port}`); // No need to comment that, no?
});
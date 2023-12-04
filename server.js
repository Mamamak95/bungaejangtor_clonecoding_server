import express from "express";
import cors from "cors";
import chatRouter from "./router/chatRouter.js";
import productRouter from "./router/productRouter.js";
import loginRouter from "./router/loginRouter.js";
import signRouter from "./router/signRouter.js";
import productListRouter from "./router/productListRouter.js";
//
import { Server } from "socket.io";
import http from "http";
const server = express();

server.use(cors()).use(express.json()).use(express.urlencoded());
const socketServer = http.createServer(server);
const io = new Server(socketServer, {
  cors: {
    methods: ["GET", "POST"],
  },
});

const PORT = 8000;

server.set("io", io);

server.use("/", productListRouter);
server.use("/sign", signRouter);
server.use("/login", loginRouter);
server.use("/chat", chatRouter(io));
server.use("/product", productRouter);
server.use("/productImg", express.static("productImg"));
server.use("/webImg", express.static("webImg"));
server.use("/userImg", express.static("userImg"));

socketServer.listen(PORT, () => {
  console.log(`server running --> ${PORT}`);
});

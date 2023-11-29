import express from "express";
import cors from "cors";
import chatRouter from "./router/chatRouter.js";
import productRouter from "./router/productRouter.js";
import loginRouter from "./router/loginRouter.js"
import signRouter from "./router/signRouter.js"

const server = express();
const PORT = 8000;
server.use(cors())
      .use(express.json())
      .use(express.urlencoded());

server.use("/sign", signRouter);
server.use("/login", loginRouter);
server.use("/chat", chatRouter);
server.use("/product", productRouter);
server.use("/productImg", express.static("productImg"));
server.use("/webImg", express.static("webImg"));

server.listen(PORT, () => {
  console.log(`server running --> ${PORT}`);
});

import express from "express";
import cors from "cors";
import chatRouter from './router/chatRouter.js'  

const server = express();
server
  .use(cors())
  .use(express.json());

server.use('/chat',chatRouter)


server.listen(8000,()=>{
  console.log('server start')
})
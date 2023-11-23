import express from "express";
import cors from "cors";
import chatRouter from './router/chatRouter.js'  
import productRouter from './router/productRouter.js'  

const server = express();
server
  .use(cors())
  .use(express.json());
  
server.use('/chat',chatRouter)
server.use('/product',productRouter)
server.use('/uploads',express.static('uploads'))

server.listen(8000,()=>{
  console.log('server start')
})
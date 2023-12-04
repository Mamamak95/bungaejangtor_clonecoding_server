import * as chatController from '../controller/chatController.js'
import * as socketController from '../controller/socketController.js'
import express from 'express'


const chatRouter = (io)=>{
  const router= express.Router()
  router.post('/list',chatController.getChat)
  router.post('/log',chatController.getChatLog)
  
  io.on("connection", (socket) => {
    socket.on("connect-room",(info)=>socketController.connectRoom(info,socket,io))
    socket.on("send-message",(message)=>socketController.sendMessage(message,socket,io))
    socket.on("disconnect",()=>console.log('socket disconnected'))
  });
  return router
}


export default chatRouter
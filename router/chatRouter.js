import * as chatController from '../controller/chatController.js'
import * as socketController from '../controller/socketController.js'
import express from 'express'

//채팅 정보 수신 관련 연결
const chatRouter = (io)=>{
  const router= express.Router()
  router.post('/read',chatController.readChat)
  router.post('/list',chatController.getChat)
  router.post('/refresh',chatController.getChatLog)
  router.post('/create',chatController.createChat)
  
  //소켓 관련 연결
  io.on("connection", (socket) => {
    socket.on("connect-room",(info)=>socketController.connectRoom(info,socket,io))
    socket.on("send-message",(message)=>socketController.sendMessage(message,socket,io))
    socket.on("read-message",(info)=>socketController.readMessage(info,socket,io))

  });
  return router
}


export default chatRouter
import * as chatRepository from '../repository/chatRepository.js'

export async function connectRoom(info,socket,io) {
  socket.join(info.uid);
}

export async function sendMessage(message,socket,io) {
    const {crid,sender,receiver,content}=message
    const result = await chatRepository.sendMessage(crid,sender,receiver,content)
  io.to(sender).to(receiver).emit("received-message", true);
}

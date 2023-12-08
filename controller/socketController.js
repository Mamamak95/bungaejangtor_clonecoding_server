import * as chatRepository from '../repository/chatRepository.js'

//소켓 연결
export async function connectRoom(info,socket,io) {
  socket.join(info.uid);
}

//메시지 전송시 실행
export async function sendMessage(message,socket,io) {
    const {crid,sender,receiver,content}=message
    const result = await chatRepository.sendMessage(crid,sender,receiver,content)
    if (result) io.to(sender).to(receiver).emit("received-message",crid);
}

export async function readMessage(info,socket,io){
    const {receiver,sender,crid}=info
    const result=await chatRepository.readChat(crid,receiver)
    if (result) io.to(sender).emit("read-message",receiver,crid)
}
import * as chatRepository from '../repository/chatRepository.js'

export async function getChat(req,res){
  const {id}=req.body
  const data=await chatRepository.getChat(id)
  res.json(data)
}

export async function getChatLog(req,res){
  const {crid}=req.body
  const data=await chatRepository.getChatLog(crid)
res.json(data)
}

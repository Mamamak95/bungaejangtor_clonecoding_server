import * as profileRepository from '../repository/profileRepository.js';

export async function profileGetAll(req,res){
  const { uid } = req.params;
  const result = await profileRepository.profileGetAll(uid);
  res.json(result);
}

export async function nameUpdate(req,res){
  const { updatedName, uid } = req.params;
  const result = await profileRepository.nameUpdate({updatedName, uid});
  res.json(result);
}

export async function commentUpdate(req,res){
  const { updatedComment, uid } = req.params;
  const result = await profileRepository.commentUpdate({updatedComment, uid});
  res.json(result);
}
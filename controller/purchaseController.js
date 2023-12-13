import * as purchaseRepository from '../repository/purchaseRepository.js';

export async function purchase(req, res) {
  const {pid,buyer,seller} = req.body;
  const result = await purchaseRepository.purchase(pid,buyer,seller);
  res.json(result);
}

export async function getReviewForm(req,res){
  const {pid,uid,tid}=req.params
  const data=await purchaseRepository.getReviewForm(pid,uid,tid)
  res.json(data)
} 
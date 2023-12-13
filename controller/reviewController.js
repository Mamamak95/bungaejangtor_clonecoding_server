import * as reviewRepository from '../repository/reviewRepository.js';

export async function getReviewForm(req,res){
  const {pid,uid,tid}=req.params
  const data=await reviewRepository.getReviewForm(pid,uid,tid)
  res.json(data)
} 

export async function postReview(req,res){
  const{pid,uid,tid,content,score}=req.body
  const result=await reviewRepository.postReview(pid,uid,tid,content,score)
  res.json(result)
}
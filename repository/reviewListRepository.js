import { db } from '../db/database.js'



export async function getReview(id) {
  const sql = 
  `
  SELECT review.rid, review.uid, review.score, review.content, user.img ,review.date
  FROM review
  JOIN user ON review.target = user.uid
  WHERE review.target = ? AND user.uid = ?;
                `
  return db
    .execute(sql, [id,id])
    .then((result) => result[0])
}










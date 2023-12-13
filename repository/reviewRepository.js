import { db } from "../db/database.js";

export async function getReviewForm(pid, uid, tid) {
  return db
    .execute(
      `select pi.img as img,p.productName as pname,p.price as price
  from product p, tradelist t, productimage pi
  where t.buyer=? and t.pid=p.pid and p.pid=pi.pid and p.pid=? and t.tid=?;`,
      [uid, pid, tid]
    )
    .then((res) => res[0][0]);
}

export async function postReview(pid, uid, tid, content, score) {
  return db.execute(
    `insert into review(uid,target,score,content,date,tid) 
    values(?,(select uid as target from product where pid=?),?,?,sysdate(),?)`,
    [uid,pid,score,content,tid]
  ).then(res=>true).catch(err=>console.log(err))
}

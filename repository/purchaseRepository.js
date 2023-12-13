import { db } from "../db/database.js";

//채팅방 정보 요청
export async function purchase(pid, buyer, seller) {
  const isSell = await db
    .execute(`select sellStatus from product where pid=?`, [pid])
    .then((res) => res[0][0].sellStatus == "sell");
  if (!isSell) {
    const trade = await db
      .execute(
        `insert into tradeList (pid,buyer,seller,date)
      values(?,?,?,sysdate())
        `,
        [pid, buyer, seller]
      )
      .then((res) => 1)
      .catch((err) => 0);
    const product = await db
      .execute('update product set sellStatus="sell", buyer=? where pid=?', [
        buyer,
        pid,
      ])
      .then((res) => 1)
      .catch((err) => 0);
    if (trade == 1 && product == 1) {
      return db.execute('select tid from tradelist where pid=?',[pid]).then(res=>res[0][0].tid)
    } else return 0;
  } else return -1;
}

export async function getReviewForm(pid,uid,tid){
  return db.execute(`select pi.img as img,p.productName as pname,p.price as price
  from product p, tradelist t, productimage pi
  where t.buyer=? and t.pid=p.pid and p.pid=pi.pid and p.pid=? and t.tid=?;`,[uid,pid,tid])
  .then(res=>res[0][0])
}
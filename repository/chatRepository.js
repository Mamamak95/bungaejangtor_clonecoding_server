import { db } from "../db/database.js";

export async function getChat(id) {
  return db
    .execute(
      "select cr.crid as crid, cr.buyer as buyer,buyer.name as buyerName,buyer.img as buyerImg,cr.seller as seller,seller.name as sellerName,seller.img as sellerImg,cr.lastestMessage as lastestMessage from (select * from chatRoom as cr where ?=cr.buyer or ?=cr.seller) as cr, user as buyer,user as seller where cr.buyer=buyer.uid and cr.seller=seller.uid",
      [id, id]
    )
    .then((res) => res[0]);
}

export async function getChatLog(crid) {
  return db
    .execute(
      'select content,sender,receiver, date_format(date,"%Y:%m:%d:%H:%i:%s") as date from chat where crid=? order by date',
      [crid]
    )
    .then((data) => data[0]);
}

export async function sendMessage(crid, sender, receiver, content) {
  return db
    .execute(
      "insert into chat(date,content,sender,receiver,crid) values(now(),?,?,?,?)",
      [content, sender, receiver, crid]
    )
    .then((res) => updateLastMessage(crid, content));
}

async function updateLastMessage(crid) {
  const data = await db
    .execute(
      "select content,date from (select crid, content, date from chat c where cid=(select max(cid) from chat ch where crid=?)) a",
      [crid]
    )
    .then((res) => res[0][0]);
  const content = data.content;
  const date = data.date;
  return db
    .execute(
      "update chatRoom set lastestMessage=?,lastestDate=? where crid=?",
      [content, date, crid]
    )
    .then(async (res) => {
      const a = await getChatLog(crid);
      return a;
    });
}

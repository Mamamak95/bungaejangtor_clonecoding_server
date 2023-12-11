import { db } from "../db/database.js";

//채팅방 정보 요청
export async function getChat(id) {
  return db
    .execute(
      `select cr.pid as pid,p.productName as pname,p.price as price,pi.img as productImg, cr.crid as crid,lastestdate as date, cr.buyer as buyer,buyer.name as buyerName,buyer.img as buyerImg,cr.seller as seller,seller.name as sellerName,seller.img as sellerImg,cr.lastestMessage as lastestMessage,readCount.cnt
      from 
        (select * from chatRoom as cr where ?=cr.buyer or ?=cr.seller) as cr inner join
          user as buyer
          on cr.buyer=buyer.uid
          inner join user as seller
          on cr.seller=seller.uid left join
          (select crid,count(case when isread=false and receiver=? then 1 end) cnt from chat where receiver=? or sender=? group by crid) as readCount
          on cr.crid=readCount.crid left join
          product as p
          on cr.pid=p.pid left join
          productimage as pi
          on p.pid=pi.pid
          order by date desc
        `,
      [id,id,id,id,id]
    )
    .then((res) => res[0]);
}

//해당 채팅방 채팅 로그 요청
export async function getChatLog(crid) {
  return db
    .execute(
      'select content,sender,receiver, date,isRead  from chat where crid=? order by date',
      [crid]
    )
    .then((data) => data[0]);
}

//crid, buyer or seller 받으면 채팅방정보 열람시간 갱신하고 열람시간 리턴
export async function readChat(crid,uid){
  
  return db.execute(`update chat set isRead=true where crid=? and receiver=?`,[crid,uid])
  .then(res=>true).catch(err=>console.log(err))
}



//신규 메세지 DB에 저장
export async function sendMessage(crid, sender, receiver, content) {
  return db
    .execute(
      "insert into chat(date,content,sender,receiver,crid,isread) values(now(),?,?,?,?,false)",
      [content, sender, receiver, crid]
    )
    .then((res) => updateLastMessage(crid, content));
}

//채팅방 정보에 신규 메세지 갱신
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
    .then(res=>true)
}

//채팅방 생성
export async function createChatRoom(uid, pid) {
  const check = await db
    .execute("select count(*) cnt from chatRoom where buyer=? and pid=?", [
      uid,
      pid,
    ])
    .then((res) => res[0][0].cnt);
    console.log('check',check)
  const seller = await db.execute("select seller from product where pid=?", [pid]).then(res=>res[0][0].seller)

  if (check==0) {
    return db
      .execute(
        'insert into chatRoom(buyer,seller,lastestMessage,lastestDate,pid) values(?,?,"",sysdate(),?)',
        [uid, seller, pid]
      )
      .then((res) => "create")
      .catch((err) => "fail");
  } else return "success";
}

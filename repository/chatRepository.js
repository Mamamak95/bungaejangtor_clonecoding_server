import {db} from '../db/database.js'

export async function getChat(id){
return db.execute(
    'select cr.crid as crid, cr.buyer as buyer,buyer.name as buyerName,seller.name as sellerName,cr.seller as seller,cr.lastestMessage as lastestMessage from (select * from chatRoom as cr where ?=cr.buyer or ?=cr.seller) as cr, user as buyer,user as seller where cr.buyer=buyer.uid and cr.seller=seller.uid',[id,id]
  ).then(res=>res[0])

}

export async function getChatLog(){
return db.execute(
  ''
  )

} 
import { db } from '../db/database.js'

export async function profileGetAll(uid) {
  const sql = `  
              select 
                  uid, 
                  name, 
                  regDate, 
                  comment 
              from 
                  user
              Where
                  uid=?
              `

  return db
    .execute(sql,[uid])
    .then((result) => result[0])
}

export async function nameUpdate({updatedName, uid}) {
  const sql = `  
                UPDATE user
                SET name = ?
                where uid = ?
              `

  return db
    .execute(sql,[updatedName,uid])
    .then((result) => 'name')
}

export async function commentUpdate({updatedComment, uid}) {
  const sql = `  
                UPDATE user
                SET comment = ?
                where uid = ?
              `

  return db
    .execute(sql,[updatedComment, uid])
    .then((result) => 'comment')
}


//상품목록
export async function userItemGetAll({seller,buyer,sort}) {
  let sql = '';
  if(sort === 'All'){
    sql =  `  
    SELECT 
      DISTINCT p.pid, 
      p.productName,
      first_value(pi.img) over (PARTITION BY p.pid ORDER BY pi.pid) AS img,
      p.regdate,
      format(p.price,0) price,
      p.sellStatus,
      p.seller,
      p.buyer,
      p.place,
      u.uid
    FROM 
      product p , productImage pi, user u
    WHERE 
      p.pid = pi.pid 
    and  
      p.seller = u.uid
    and
      (p.seller = ? or p.buyer = ?)              
    ORDER BY 
      p.regdate desc    
    `
  }else if(sort === 'Sell'){
    sql =  `  
    SELECT 
      DISTINCT p.pid, 
      p.productName,
      first_value(pi.img) over (PARTITION BY p.pid ORDER BY pi.pid) AS img,
      p.regdate,
      format(p.price,0) price,
      p.sellStatus,
      p.seller,
      p.buyer,
      p.place,
      u.uid
    FROM 
      product p , productImage pi, user u
    WHERE 
      p.pid = pi.pid 
    and  
      p.seller = u.uid
    and
      (p.seller = ? or p.seller = ?)   
    ORDER BY 
      p.regdate desc    
    `
  }else if(sort === 'Buy'){
    sql =  `  
    SELECT 
      DISTINCT p.pid, 
      p.productName,
      first_value(pi.img) over (PARTITION BY p.pid ORDER BY pi.pid) AS img,
      p.regdate,
      format(p.price,0) price,
      p.sellStatus,
      p.seller,
      p.buyer,
      p.place,
      u.uid
    FROM 
      product p , productImage pi, user u
    WHERE 
      p.pid = pi.pid 
    and  
      p.seller = u.uid
    and
      (p.buyer = ? or p.buyer =?)
    ORDER BY 
      p.regdate desc    
    `
  }

  return db
    .execute(sql,[seller,buyer])
    .then((result)=>result[0])
}
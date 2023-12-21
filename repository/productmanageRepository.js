import { db } from '../db/database.js'

export async function manageGetAll({seller,buyer}) {
  const sql = `  
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
                (p.seller = ? or buyer = ?)       
              ORDER BY 
                p.regdate desc    
              `

  return db
    .execute(sql,[seller,buyer ])
    .then((result)=>result[0])
}

/* 삭제 */
export async function manageRemove(selectedProduct){
  const sql = `delete from product where pid = ?`;

  return db
        .execute(sql, [selectedProduct])
        .then((result) => '삭제');
}

// export async function manageRemove(selectedProduct){
  //   const placeholders = selectedProduct.map(() => '?').join(', ');
  //   const sql = `DELETE FROM product WHERE pid IN (${placeholders})`;
  
  //   return db
  //         .execute(sql, [selectedProduct])
  //         .then((result) => 'ok');
  // }
  
  /* 판매완료 */
  export async function manageComplete(selectedProduct){
    const sql = ` UPDATE 
                      product 
                  SET 
                      sellStatus = 'sell' 
                  where 
                      pid = ?`;
  
    return db
          .execute(sql, [selectedProduct])
          .then((result) => '판매완료');
  }
  
  
import { db } from '../db/database.js'

export async function newProduct(seller, productName, content, price, place, category) {
  const sql = `
                insert into product  (seller, 
                  regdate, 
                  content, 
                  productName, 
                  price, 
                  buyer, 
                  place, 
                  category, 
                  productStatus, 
                  sellStatus, 
                  includeDelivery)
              values
                  (?, 
                  sysdate(), 
                  ?, 
                  ?, 
                  ?, 
                  null, 
                  ?, 
                  ?, 
                  'Used', 
                  'Available', 
                  true);
                
                `
  return db
    .execute(sql, [seller, content, productName, price, place, category])
    .then((result) => {
      const lastInsertedId = result[0].insertId;

      // You can now use 'lastInsertedId' as the pid value or return it
      return lastInsertedId;
    })

}

export async function productImg(pid, img) {
  const sql = `
            INSERT INTO productImage (pid, img, date)
            VALUES
              (?, ?, sysdate());
                          
                `
  return db
    .execute(sql, [pid, img])
    .then((result) => 'success')
}

export async function detail(pid) {
  const sql = `
  SELECT 
  p.pid,
  p.seller,
  p.regdate,
  p.content,
  p.productName,
  p.sellStatus,
  FORMAT(p.price, 0) AS price,
  GROUP_CONCAT(pi.img) AS images,
  u.img AS userImage,
  (SELECT COUNT(pid) FROM product WHERE seller = p.seller) AS total_pid_count
FROM 
  product p
JOIN 
  productImage pi ON p.pid = pi.pid
LEFT JOIN
  user u ON p.seller = u.uid
WHERE 
  p.pid = ?
GROUP BY
  p.pid, p.seller, p.regdate, p.content, p.productName, p.price, u.img
                                
                `
  return db
    .execute(sql, [pid])
    .then((result) => result[0])
}

export async function similiar() {
  const sql = `
              SELECT 
              DISTINCT p.pid, 
              p.productName,
              first_value(pi.img) over (PARTITION BY p.pid ORDER BY pi.pid) AS img,
              left(p.regdate, 4) regdate,
              format(p.price,0) price, 
              first_value(pi.img) over(order by pi.pid)
            FROM 
              product p JOIN productImage pi 
            ON 
              p.pid = pi.pid
            WHERE
              p.sellStatus = 'Available'
            LIMIT 10;
                          
                `
  return db
    .execute(sql, [])
    .then((result) => result[0])
}

export async function shop(seller) {
  const sql = `
                  SELECT 
                  DISTINCT p.pid, 
                  p.productName,
                  p.seller,
                  first_value(pi.img) over (PARTITION BY p.pid ORDER BY pi.pid) AS img,
                  left(p.regdate, 4) regdate,
                  format(p.price,0) price, 
                  first_value(pi.img) over(order by pi.pid)
                FROM 
                  product p JOIN productImage pi 
                ON 
                  p.pid = pi.pid
                  and seller = ?
                LIMIT 6;
                          
                `
  return db
    .execute(sql, [seller])
    .then((result) => result[0])
}



export async function userWish(uid) {
  const sql = ` select bid,pid from wishList where uid= ?;`
  return db
    .execute(sql, [uid])
    .then((result) => result[0])
}

export async function addWishList(uid, pid) {
  const sql = ` INSERT INTO wishList (uid, pid, date)
                  VALUES (?, ?, NOW());`
  return db
    .execute(sql, [uid, pid])
    .then((result) => 'success')
}
export async function deleteWishList(uid, pid) {
  const sql = ` DELETE FROM wishList WHERE uid = ? AND pid = ?;`
  return db
    .execute(sql, [uid, pid])
    .then((result) => 'success')
}

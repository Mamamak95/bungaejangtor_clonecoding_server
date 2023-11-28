import { db } from '../db/database.js'

export async function newProduct(seller, productName,content, price, place, category) {
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
    .execute(sql,[seller,content,productName,price,place,category])
    .then((result) => {
      const lastInsertedId = result[0].insertId;

      // You can now use 'lastInsertedId' as the pid value or return it
      return lastInsertedId;
    })

}

export async function productImg(pid,img) {
  const sql = `
            INSERT INTO productImage (pid, img, date)
            VALUES
              (?, ?, sysdate());
                          
                `
  return db
    .execute(sql,[pid,img])
    .then((result) => 'success')
}
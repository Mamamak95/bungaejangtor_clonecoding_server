import { db } from '../db/database.js'

export async function newProduct(seller, productName,content, price, place, category) {
  const sql = `
  insert into product  (seller, 
                        regdate, 
                        title,
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
                        curdate(), 
                        ?, 
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
    .execute(sql,[seller,productName,content,productName,price,place,category])
    .then((result) => 'success')
}
import { db } from '../db/database.js'

export async function newProduct(seller, content, productName, price, place, category) {
  const sql = ``
  return db
    .execute(sql, )
    .then((result) => 'success')
}
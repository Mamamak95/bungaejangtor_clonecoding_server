import { db } from '../db/database.js'

export async function renewProduct(seller, productName, content, price, place, category, pid) {
  const sql = `
    UPDATE product
    SET
      seller = ?,
      content = ?,
      productName = ?,
      price = ?,
      place = ?,
      category = ?,
      productStatus = 'Used',
      sellStatus = 'Available',
      includeDelivery = true
    WHERE pid = ?;
  `;

  return db
    .execute(sql, [seller, content, productName, price, place, category, pid])
    .then((result) => 'success');
}

export async function deleteImg(pid) {
  const sql = `
                DELETE FROM productImage
                WHERE pid = ?;

                `
  return db
    .execute(sql, [pid])
    .then((result) => 'success')
}

// export async function productImg(pid, img) {
//   const sql = `
//             INSERT INTO productImage (pid, img, date)
//             VALUES
//               (?, ?, sysdate());

//                 `
//   return db
//     .execute(sql, [pid, img])
//     .then((result) => 'success')
// }






export async function editProduct(pid) {
  const sql = ` select seller, productName, content, price, place, category from product where pid= ?;`
  return db
    .execute(sql, [pid])
    .then((result) => result[0])
}

export async function imgList(pid) {
  const sql = ` select imageid,img from productImage where pid= ?;`
  return db
    .execute(sql, [pid])
    .then((result) => result[0])
}

import { db } from '../db/database.js'

export async function WishList(uid, startIndex, endIndex, sort) {
  let sql = '';
  if (sort === 'date') {
    sql = `
    WITH RankedWishList AS (
      SELECT
        wl.bid,
        wl.pid,
        wl.uid,
        p.productName,
        p.price,
        p.place,
        p.sellStatus,
        MIN(pi.img) AS productImage,
        p.regdate AS productRegDate,
        ROW_NUMBER() OVER (ORDER BY wl.bid DESC) AS rno,
        COUNT(*) OVER () AS totalItemCount
      FROM
        wishList wl
      JOIN
        product p ON wl.pid = p.pid
      JOIN
        (
          SELECT pid, MIN(img) AS img
          FROM productImage
          GROUP BY pid
        ) pi ON wl.pid = pi.pid
      WHERE
        wl.uid = ?
      GROUP BY
        wl.bid, wl.pid, wl.uid, p.productName, p.price, p.place, p.sellStatus, productRegDate
    )
    SELECT
      bid,
      pid,
      uid,
      productName,
      price,
      place,
      sellStatus,
      productImage,
      productRegDate,
      rno,
      totalItemCount
    FROM
      RankedWishList
    WHERE
      rno BETWEEN ? AND ?;
      `
  }else if(sort === 'highPrice'){
    sql =`
    WITH RankedWishList AS (
      SELECT
        wl.bid,
        wl.pid,
        wl.uid,
        p.productName,
        p.price,
        p.place,
        p.sellStatus,
        MIN(pi.img) AS productImage,
        p.regdate AS productRegDate,
        ROW_NUMBER() OVER (ORDER BY p.price DESC) AS rno,
        COUNT(*) OVER () AS totalItemCount
      FROM
        wishList wl
      JOIN
        product p ON wl.pid = p.pid
      JOIN
        (
          SELECT pid, MIN(img) AS img
          FROM productImage
          GROUP BY pid
        ) pi ON wl.pid = pi.pid
      WHERE
        wl.uid = ?
      GROUP BY
        wl.bid, wl.pid, wl.uid, p.productName, p.price, p.place, p.sellStatus, productRegDate
    )
    SELECT
      bid,
      pid,
      uid,
      productName,
      price,
      place,
      sellStatus,
      productImage,
      productRegDate,
      rno,
      totalItemCount
    FROM
      RankedWishList
    WHERE
      rno BETWEEN ? AND ?;
    
    `
  }else if(sort === 'lowPrice'){
    sql = `
    WITH RankedWishList AS (
      SELECT
        wl.bid,
        wl.pid,
        wl.uid,
        p.productName,
        p.price,
        p.place,
        p.sellStatus,
        MIN(pi.img) AS productImage,
        p.regdate AS productRegDate,
        ROW_NUMBER() OVER (ORDER BY p.price ASC) AS rno,
        COUNT(*) OVER () AS totalItemCount
      FROM
        wishList wl
      JOIN
        product p ON wl.pid = p.pid
      JOIN
        (
          SELECT pid, MIN(img) AS img
          FROM productImage
          GROUP BY pid
        ) pi ON wl.pid = pi.pid
      WHERE
        wl.uid = ?
      GROUP BY
        wl.bid, wl.pid, wl.uid, p.productName, p.price, p.place, p.sellStatus, productRegDate
    )
    SELECT
      bid,
      pid,
      uid,
      productName,
      price,
      place,
      sellStatus,
      productImage,
      productRegDate,
      rno,
      totalItemCount
    FROM
      RankedWishList
    WHERE
      rno BETWEEN ? AND ?;
    `
  }


  return db
    .execute(sql, [uid, startIndex, endIndex])
    .then((result) => result[0])
}

export async function orderList(uid, bid) {
  const sql = `              
                  DELETE FROM wishList
                  WHERE uid = ? AND bid = ?;
              `

  return db
    .execute(sql, [uid, bid])
    .then((result) => result[0])
}

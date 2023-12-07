import { db } from '../db/database.js'

export async function WishList(uid) {
      const sql = `              
      SELECT
      wl.bid,
      wl.pid,
      wl.uid,
      p.productName,
      p.price,
      p.place,
      p.sellStatus,
      MIN(pi.img) AS productImage,
      p.regdate AS productRegDate
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
    ORDER BY
      wl.bid;
              `

      return db
            .execute(sql, [uid])
            .then((result) => result[0])
}

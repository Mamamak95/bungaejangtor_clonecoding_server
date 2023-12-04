import { db } from '../db/database.js'

export async function getAll() {
  const sql = `  
                SELECT 
                      DISTINCT p.pid, 
                      p.productName,
                      first_value(pi.img) over (PARTITION BY p.pid ORDER BY pi.pid) AS img,
                      p.regdate,
                      format(p.price,0) price
                FROM 
                      product p JOIN productImage pi 
                ON 
                      p.pid = pi.pid
                LIMIT 10 offset 0
              `

  return db
    .execute(sql)
    .then((result) => result[0])
}

export async function loadMore({newLimit, offset}) {
  const sql = `
                SELECT 
                      DISTINCT p.pid, 
                      p.productName,
                      first_value(pi.img) over (PARTITION BY p.pid ORDER BY pi.pid) AS img,
                      p.regdate,
                      format(p.price,0) price
                FROM 
                      product p JOIN productImage pi 
                ON 
                      p.pid = pi.pid
                LIMIT ? offset ?
              `

  return db
    .execute(sql,[newLimit,offset])
    .then((result) => result[0])
}
import { db } from '../db/database.js'

export async function getAll() {
  const sql = `  
                SELECT 
                      DISTINCT p.pid, 
                      p.productName,
                      first_value(pi.img) over (PARTITION BY p.pid ORDER BY pi.pid) AS img,
                      p.regdate,
                      format(p.price,0) price,
                      p.sellStatus,
                      p.place
                FROM 
                      product p JOIN productImage pi 
                ON 
                      p.pid = pi.pid
                WHERE 
                      p.sellStatus = "Available" 
                ORDER BY 
                      p.regdate desc    
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
                      format(p.price,0) price,
                      p.sellStatus,
                      p.place
                FROM 
                      product p JOIN productImage pi 
                ON 
                      p.pid = pi.pid
                WHERE 
                      p.sellStatus = "Available" 
                ORDER BY 
                      p.regdate desc    
                LIMIT ? offset ?
              `

  return db
    .execute(sql,[newLimit,offset])
    .then((result) => result[0])
}
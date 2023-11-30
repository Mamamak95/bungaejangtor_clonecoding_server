import { db } from '../db/database.js'

// export async function getAll({itemCount}) {
//   const sql = `select
//                   row_number() over (order by p.regdate) as pno, 
//                   p.productName,
//                   p.price, 
//                   p.regdate, 
//                   pi.img, 
//                   p.pid 
//                 from 
//                     product p ,productimage pi
//                 where 
//                     p.pid = pi.pid 
//                 and p.pid between ? and ?`
//   return db
//     .execute(sql,[itemCount])
//     .then((result) => result[0])
// }

export async function getAll() {
  const sql = `  
                select row_number() over (order by p.regdate) as pno, 
                  p.productName,
                  p.price,
                  left(p.regdate, 4) regdate,
                  pi.img, 
                  p.pid 
                from 
                    product p ,productimage pi
                where 
                    p.pid = pi.pid
                and 
                    p.pid LIMIT 5 offset 0`

  return db
    .execute(sql)
    .then((result) => result[0])
}

export async function loadMore({newLimit, offset}) {
  const sql = `select
                  row_number() over (order by p.regdate) as pno, 
                  p.productName,
                  p.price,
                  left(p.regdate, 10) regdate,
                  pi.img, 
                  p.pid 
                from 
                    product p ,productimage pi
                where 
                    p.pid = pi.pid
                and 
                    p.pid LIMIT ? offset ?`

  return db
    .execute(sql,[newLimit,offset])
    .then((result) => result[0])
}
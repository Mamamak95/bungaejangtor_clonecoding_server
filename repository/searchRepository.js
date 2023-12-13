import { db } from '../db/database.js';

/* 상품이름 검색 */
export async function getSearchList( searchName ){
  let searchNameProduct = `%${searchName}%`

  const sql = `
                SELECT 
                DISTINCT p.pid, 
                p.productName,
                first_value(pi.img) over (PARTITION BY p.pid ORDER BY pi.pid) AS img,
                p.regdate,
                format(p.price,0) price,
                p.sellStatus
                FROM 
                product p JOIN productImage pi 
                ON 
                p.pid = pi.pid
                WHERE 
                p.productName like ? 
                ORDER BY 
                p.regdate desc
              `

  return db
  .execute(sql, [ searchNameProduct ])
  .then((rows) => rows[0])
}

/* 상품리스트 페이지네이션 */
// export async function getPageList({searchName, newLimit, offset}){
//   let search = `%${searchName}%`

//   const sql = `
//                 SELECT 
//                 DISTINCT p.pid, 
//                 p.productName,
//                 first_value(pi.img) over (PARTITION BY p.pid ORDER BY pi.pid) AS img,
//                 p.regdate,
//                 format(p.price,0) price,
//                 p.sellStatus
//                 FROM 
//                 product p JOIN productImage pi 
//                 ON 
//                 p.pid = pi.pid
//                 WHERE 
//                 p.productName like ? 
//                 ORDER BY 
//                 p.regdate desc    
//                 LIMIT ? offset ?
//               `

//   return db
//   .execute(sql, [search, newLimit, offset])
//   .then((rows) => rows[0])
// }
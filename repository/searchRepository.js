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

/* 상품이름검색 서버 저장 */
export async function insertSearchName({value}){
  const sql = `
                insert into search(searchName) values(?)
              `

  return db
  .execute(sql, [ value ])
  .then((result) => 'good')
}

/* 상품 인기검색어 가져오기 */
export async function getSearchPopular( value ){

  const sql = `
                SELECT 
                row_number() over (ORDER BY COUNT(p.productName) DESC) as rno, s.searchName, COUNT(p.productName) as count
                FROM 
                search s
                JOIN 
                product p ON p.productName LIKE CONCAT('%', s.searchName, '%')
                WHERE 
                p.productName IS NOT NULL
                GROUP BY 
                s.searchName
                ORDER BY 
                count DESC
                LIMIT 10;
              `

  return db
  .execute(sql, [ value ])
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
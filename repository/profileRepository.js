import { db } from '../db/database.js'

export async function profileGetAll(uid) {
  const sql = `  
              select 
                  uid, 
                  name, 
                  regDate, 
                  comment 
              from 
                  user
              Where
                  uid=?
              `

  return db
    .execute(sql,[uid])
    .then((result) => result[0])
}

export async function nameUpdate({updatedName, uid}) {
  const sql = `  
                UPDATE user
                SET name = ?
                where uid = ?
              `

  return db
    .execute(sql,[updatedName,uid])
    .then((result) => 'name')
}

export async function commentUpdate({updatedComment, uid}) {
  const sql = `  
                UPDATE user
                SET comment = ?
                where uid = ?
              `

  return db
    .execute(sql,[updatedComment, uid])
    .then((result) => 'comment')
}

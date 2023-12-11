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

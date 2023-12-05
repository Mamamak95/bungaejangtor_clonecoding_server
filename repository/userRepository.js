import { db } from '../db/database.js';

/* 회원가입 */
export async function insertUser({ uid, hashPass, name, email, tel }){
  const sql = 'insert into user(uid, pw, name, email, tel, regDate) values(?, ?, ?, ?, ?, curdate())';

  return db
  .execute(sql,[ uid, hashPass, name, email, tel ])
  .then((result) => 'good')
}

/* 아이디 비교 체크 */
export async function getUserId( uid ){

  return db
  .execute('select count(uid) as cnt from user where uid = ?', [ uid ])
  .then((rows) => rows[0][0])
}

/* 폰번호 체크 */
export async function getUserTel( tel ){

  return db
  .execute('select count(tel) as cnt from user where tel = ?', [tel])
  .then((rows) => rows[0][0])
}

/* 로그인 */
export async function getLogin( uid ){

  return db
  .execute('select count(pw) as cnt, ANY_VALUE(pw) as pw from user where uid = ?', [uid])
  .then((rows) => rows[0][0])
}

import * as userRepository from '../repository/userRepository.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

/* 회원가입 */
export async function insertUser(req,res){
  const { uid, pw, name, email, tel } = req.body;
  const hashPass = bcrypt.hashSync(pw, 10);
  const result = await userRepository.insertUser({ uid, hashPass, name, email, tel });

  res.json(result);
}

/* 아이디 비교 체크 */
export async function getUserId(req, res){
  const uid = req.params.uid;
  const result = await userRepository.getUserId( uid );

  res.json(result);
}

/* 로그인 */
export async function getLogin(req, res){
  const { uid, pw } = req.body;
  const result = await userRepository.getLogin(uid);

  result.login = false;

  let token = null;

  if(result.cnt === 1){
    if(await bcrypt.compare(pw, result.pw)){
      result.login = true;

      token = jwt.sign({uid : uid}, '556pT=W6Pr')

      result.token = token;
    }
  }
  res.json(result)
}
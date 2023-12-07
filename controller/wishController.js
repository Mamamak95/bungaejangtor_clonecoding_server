import * as wishRepository from '../repository/wishRepository.js';



// 찜리스트
export async function WishList(req, res) {
  let { uid } = req.params;
  let result =  await wishRepository.WishList(uid)
  res.json(result)

}


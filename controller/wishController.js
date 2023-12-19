import * as wishRepository from '../repository/wishRepository.js';



// 찜리스트
export async function WishList(req, res) {
  let { uid, startIndex, endIndex, sort } = req.params;
    let result = await wishRepository.WishList(uid, startIndex, endIndex,sort)
    res.json(result)


}
export async function removeList(req, res) {
  let { uid } = req.params;
  const results = [];

  try {
    for (let bid of req.body) {
      let success = await wishRepository.orderList(uid, bid);
      results.push(success)
    };
  } catch (error) {
    console.error(error);
  }
  res.json(results);

}


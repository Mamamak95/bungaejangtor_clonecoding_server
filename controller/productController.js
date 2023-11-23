import * as productsRepository from '../repository/productsRepository.js'





export async function newProduct(req, res) {

  // if (req.file) {
  //   res.json({ success: true, message: '이미지가 성공적으로 업로드되었습니다.' });
  // } else {
  //   res.json({ success: false, message: '이미지 업로드에 실패했습니다.' });
  // }
  let { img, seller, productName, category, place, price, content } = req.body;
  img = req.file.path
  const result = await productsRepository.newProduct(seller, productName, content, price, place, category);
  res.json(result)
}
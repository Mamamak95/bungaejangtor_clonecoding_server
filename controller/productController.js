import * as productsRepository from '../repository/productsRepository.js'

export async function newProduct(req, res) {
  let { seller, productName, category, place, price, content } = req.body;
  const result = await productsRepository.newProduct(seller, productName,content, price, place, category);
  res.json(result)
}
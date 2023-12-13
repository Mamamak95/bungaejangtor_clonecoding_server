import * as purchaseRepository from '../repository/purchaseRepository.js';

export async function purchase(req, res) {
  const {pid,buyer,seller} = req.body;
  const result = await purchaseRepository.purchase(pid,buyer,seller);
  res.json(result);
}

import * as productListRepository from '../repository/productListRepository.js';

export async function getAll(req,res){
  const result = await productListRepository.getAll();
  res.json(result);
}

export async function loadMore(req, res) {
  const {newLimit, offset} = req.params;
  console.log({newLimit, offset});
  const result = await productListRepository.loadMore({newLimit, offset});
  res.json(result);
}
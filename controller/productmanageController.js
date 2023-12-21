import * as productmanageRepository from '../repository/productmanageRepository.js';

export async function manageGetAll(req,res){
  const { seller,buyer  } = req.params;
  const result = await productmanageRepository.manageGetAll({seller,buyer });
  res.json(result);
}

export async function manageRemove(req,res){
  const { selectedProduct } = req.params;
  const result = await productmanageRepository.manageRemove(selectedProduct);
  res.json(result);
}

export async function manageComplete(req,res){
  const { selectedProduct } = req.params;
  const result = await productmanageRepository.manageComplete(selectedProduct);
  res.json(result);
}
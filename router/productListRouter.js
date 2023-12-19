import * as productListController from '../controller/productListController.js';
import express from 'express'

const router = express.Router()
router.get('/',productListController.getAll)
router.post('/loadMore/:offset/:newLimit', productListController.loadMore);
//router.get('/:pid', productListController.getProduct)

export default router
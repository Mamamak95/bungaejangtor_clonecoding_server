import * as productController from '../controller/productController.js'
import express from 'express'


const router = express.Router()


router.get('/:pid/:uid',productController.detail)
router.post('/new/:id',productController.newProduct);
router.post('/wish',productController.addWishList);







export default router
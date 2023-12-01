import * as productController from '../controller/productController.js'
import express from 'express'


const router = express.Router()


router.get('/:pid',productController.detail)
router.post('/new/:id',productController.newProduct);







export default router
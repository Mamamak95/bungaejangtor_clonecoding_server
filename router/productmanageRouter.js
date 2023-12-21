import * as productmanageController from '../controller/productmanageController.js';
import express from 'express'


const router = express.Router()


router.get('/:uid/:seller/:buyer', productmanageController.manageGetAll)
router.get('/:uid/:selectedProduct', productmanageController.manageRemove)
router.post('/:uid/:selectedProduct', productmanageController.manageComplete)

export default router
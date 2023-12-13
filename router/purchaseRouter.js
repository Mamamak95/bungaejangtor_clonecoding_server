import * as purchaseController from '../controller/purchaseController.js'
import express from 'express'


const router = express.Router()

router.post('/',purchaseController.purchase);
router.get('/:pid/:uid/:tid',purchaseController.getReviewForm)
export default router
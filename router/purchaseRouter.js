import * as purchaseController from '../controller/purchaseController.js'
import express from 'express'


const router = express.Router()

router.post('/',purchaseController.purchase);

export default router
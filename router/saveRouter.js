import * as saveController from '../controller/saveController.js'
import express from 'express'


const router = express.Router()


router.post('/:uid',saveController.saveImg)








export default router
import * as wishController from '../controller/wishController.js'
import express from 'express'


const router = express.Router()



router.get('/:uid',wishController.WishList);







export default router
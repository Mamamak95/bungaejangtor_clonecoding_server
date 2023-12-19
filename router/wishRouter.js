import * as wishController from '../controller/wishController.js'
import express from 'express'


const router = express.Router()



router.get('/:uid/:startIndex/:endIndex/:sort',wishController.WishList);
router.post('/:uid',wishController.removeList);







export default router
import * as reviewController from '../controller/reviewController.js'
import express from 'express'


const router = express.Router()

router.get('/:pid/:uid/:tid',reviewController.getReviewForm)
router.post('/',reviewController.postReview)
export default router
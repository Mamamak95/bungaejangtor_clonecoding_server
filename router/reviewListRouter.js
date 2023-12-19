import * as reviewListController from '../controller/reviewListController.js'
import express from 'express'


const router = express.Router()



router.get('/:id',reviewListController.getReview);







export default router
import * as profileController from '../controller/profileController.js';
import express from 'express'


const router = express.Router()


router.get('/:uid', profileController.profileGetAll)
router.get('/:uid/updatedName/:updatedName', profileController.nameUpdate)
router.get('/:uid/updatedComment/:updatedComment', profileController.commentUpdate)

router.get('/:uid/:seller/:buyer/:sort', profileController.userItemGetAll)

export default router
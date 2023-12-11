import * as profileController from '../controller/profileController.js';
import express from 'express'


const router = express.Router()


router.get('/:uid', profileController.profileGetAll)


export default router
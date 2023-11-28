import express from 'express';
import * as userController from '../controller/userController.js'

const router = express.Router();

router
.get('/:uid', userController.getUserId)
.post('/', userController.insertUser)

export default router;
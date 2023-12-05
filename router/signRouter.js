import express from 'express';
import * as userController from '../controller/userController.js'

const router = express.Router();

router
.get('/:uid', userController.getUserId)
.post('/', userController.insertUser)

.get('/user/:tel', userController.getUserTel)

export default router;
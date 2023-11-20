import * as chatController from '../controller/chatController.js'
import express from 'express'

const router = express.Router()
router.post('/list',chatController.getChat)
router.post('/log',chatController.getChatLog)





export default router
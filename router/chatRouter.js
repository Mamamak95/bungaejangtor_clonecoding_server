import * as chatController from '../controller/chatController.js'
import express from 'express'

const router = express.Router()
router.post('/list',chatController.getChat)
router.post('/log',chatController.getChatLog)
router.post('/send',chatController.sendMessage)





export default router
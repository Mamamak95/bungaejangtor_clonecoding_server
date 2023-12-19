import * as editController from '../controller/editController.js'
import express from 'express'


const router = express.Router()



router.get('/:pid',editController.editProduct);
router.post('/:pid',editController.renew)







export default router
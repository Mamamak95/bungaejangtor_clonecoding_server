import * as productController from '../controller/productController.js'
import express from 'express'
import multer from 'multer'
import path from 'path';

const router = express.Router()

// 이미지를 저장할 디렉토리 설정
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'productImg/');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.post('/new/:id', upload.single('image'), productController.newProduct);







export default router
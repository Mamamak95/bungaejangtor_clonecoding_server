import * as productsRepository from '../repository/productsRepository.js';
import multer from 'multer';
import path from 'path';

// 이미지를 저장할 디렉토리 설정
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'productImg/');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage }).array('images');

export async function newProduct(req, res) {
  let imgUrl = [];
  upload(req, res, err => {
    if (err) {
      console.log(err);
    } else {

      let { img, seller, productName, category, place, price, content } = JSON.parse(req.body.form);
      imgUrl = req.files.map(file => {
        return file.path;
      });
      console.log(imgUrl);
      img = imgUrl[0]
    }
  });
}
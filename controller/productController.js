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
  await upload(req, res, async (err) => {
    if (err) {
      console.log(err);
    } else {

      let {seller, productName, category, place, price, content } = JSON.parse(req.body.form);

      
      let pid = await productsRepository.newProduct(seller, productName,content, price, place, category)
      console.log(pid);

      imgUrl = req.files.map(file => {
        return file.path;
      });

      let result =[]
      try {
        for (let img of imgUrl) {
          let success = await productsRepository.productImg(pid,img);
          result.push(success)
        };
      } catch (error) {
        console.error(error);
      }
      console.log(result);
      res.json(result);
    }
  });
}
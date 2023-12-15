// import * as productsRepository from '../repository/productsRepository.js';
import multer from 'multer';
import path from 'path';

// 이미지를 저장할 디렉토리 설정
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'productImg/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage }).array('images');

// 상품등록
export async function saveImg(req, res) {
  let imgUrl = [];
  await upload(req, res, async (err) => {
    if (err) {
      console.log(err);
    } else {

      imgUrl = req.files.map(file => {
        return file.path;
      });

      res.json(imgUrl);
    }
  });
}

import * as editRepository from '../repository/editRepository.js';
import * as productsRepository from '../repository/productsRepository.js';

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
export async function renew(req, res) {
  let { pid } = req.params
  let imgUrl = [];
  await upload(req, res, async (err) => {
    if (err) {
      console.log(err);
    } else {
      // let deleteImgArr = JSON.parse(req.body.deleteImg);
      let { seller, productName, category, place, price, content } = JSON.parse(req.body.form);


      let result = await editRepository.renewProduct(seller, productName, content, price, place, category, pid)

      if (req.files) {
        imgUrl = req.files.map(file => file.path);
      }



      if (req.body.tempImg) {
        let tempImg = JSON.parse(req.body.tempImg);
        imgUrl = [...tempImg,...imgUrl];
      } else {
        let saveImg = JSON.parse(req.body.saveImg);
        imgUrl = [...saveImg.map(v => v.img), ...imgUrl];
      }


      let result2 = []
      try {
        let success = await editRepository.deleteImg(pid)
        for (let img of imgUrl) {
          let success2 = await productsRepository.productImg(pid, img);
          result2.push(success2)
        };
      } catch (error) {
        console.error(error);
      }
      res.json(result2);
    }
  });
}




// 찜등록
export async function editProduct(req, res) {
  const { pid } = req.params;
  let result = await editRepository.editProduct(pid)
  let images = await editRepository.imgList(pid)
  res.json({ data: result[0], image: images })
}




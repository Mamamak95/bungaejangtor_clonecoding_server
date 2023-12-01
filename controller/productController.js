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

// 상품등록
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
      res.json(result);
    }
  });
}

// 상품상세

export async function detail(req,res) {
  let {pid} = req.params;
  let result = await productsRepository.detail(pid);
  let result2 = await productsRepository.similiar();

  let seller = result[0].seller

  let result3 = await productsRepository.shop(seller); 

  res.json({product:result[0],slide:result2,shopData:result3})
}

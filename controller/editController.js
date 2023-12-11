import * as editRepository from '../repository/editRepository.js';
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
// export async function newProduct(req, res) {
//   let imgUrl = [];
//   await upload(req, res, async (err) => {
//     if (err) {
//       console.log(err);
//     } else {

//       let {seller, productName, category, place, price, content } = JSON.parse(req.body.form);

      
//       let pid = await productsRepository.newProduct(seller, productName,content, price, place, category)

//       imgUrl = req.files.map(file => {
//         return file.path;
//       });

//       let result =[]
//       try {
//         for (let img of imgUrl) {
//           let success = await productsRepository.productImg(pid,img);
//           result.push(success)
//         };
//       } catch (error) {
//         console.error(error);
//       }
//       res.json(result);
//     }
//   });
// }




// 찜등록
export async function editProduct(req,res) {
  const {pid} = req.params;
  let result = await editRepository.editProduct(pid)
  let images = await editRepository.imgList(pid)
  res.json({data:result[0] , image : images})
}




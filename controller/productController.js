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
export async function newProduct(req, res) {
  let imgUrl = [];
  await upload(req, res, async (err) => {
    if (err) {
      console.log(err);
    } else {

      let {seller, productName, category, place, price, content } = JSON.parse(req.body.form);

      
      let pid = await productsRepository.newProduct(seller, productName,content, price, place, category)

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
  // let {pid,uid} = req.params;
  // let result = await productsRepository.detail(pid);
  // let result2 = await productsRepository.similiar();

  // let seller =  result ? result[0].seller : null

  // let result3 = await productsRepository.shop(seller); 
  // let result4 = await productsRepository.userWish(uid)

  // res.json({product:result[0],slide:result2,shopData:result3,wishList:result4})

  try {
    let { pid, uid } = req.params;
    let result = await productsRepository.detail(pid);

    // Check if result has any elements before accessing properties
    let seller = result && result.length > 0 ? result[0].seller : null;

    let result2 = await productsRepository.similiar();
    let result3 = await productsRepository.shop(seller);
    let result4 = await productsRepository.userWish(uid);

    res.json({ product: result[0], slide: result2, shopData: result3, wishList: result4 });
  } catch (error) {
    // Handle errors here
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// 찜등록
export async function addWishList(req,res) {
  let {uid,pid,btnWish} = req.body
  if(btnWish){
    let result = await productsRepository.deleteWishList(uid,pid)
    res.json(result)
  }else{
    let result = await productsRepository.addWishList(uid,pid)
    res.json(result)
  }

}


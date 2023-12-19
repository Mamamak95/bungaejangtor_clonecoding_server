import * as reviewListRepository from '../repository/reviewListRepository.js';



// 찜리스트
export async function getReview(req, res) {
  let {id} = req.params;
  let result = await reviewListRepository.getReview(id)
  res.json(result)


    


}


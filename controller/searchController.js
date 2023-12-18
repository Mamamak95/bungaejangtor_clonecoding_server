import * as searchRepository from '../repository/searchRepository.js';

/* 상품이름 검색 */
export async function getSearchList(req, res){
  const searchName = req.query.query;
  const result = await searchRepository.getSearchList( searchName );

  res.json(result);
}

/* 상품이름검색 서버로 저장 */
export async function insertSearchName(req, res){
  const { value } = req.body;
  const result = await searchRepository.insertSearchName({value});

  res.json(result);
}

/* 상품 인기검색어 가져오기 */
export async function getSearchPopular(req, res){
  const { value } = req.params;
  const result = await searchRepository.getSearchPopular({value});

  res.json(result);
}

/* 상품리스트 페이지네이션 */
// export async function getPageList(req, res){
//   const { searchName, newLimit, offset } = req.params;
//   const result = await searchRepository.getPageList({searchName, newLimit, offset});
//   res.json(result);
// }
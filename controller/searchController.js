import * as searchRepository from '../repository/searchRepository.js';

/* 상품이름 검색 */
export async function getSearchList(req, res){
  const searchName = req.query.query;
  const result = await searchRepository.getSearchList( searchName );

  res.json(result);
}

/* 상품리스트 페이지네이션 */
// export async function getPageList(req, res){
//   const { searchName, newLimit, offset } = req.params;
//   const result = await searchRepository.getPageList({searchName, newLimit, offset});
//   res.json(result);
// }
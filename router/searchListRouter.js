import express from 'express';
import * as searchController from '../controller/searchController.js'

const router = express.Router();

router
.get('/', searchController.getSearchList)
// .get('/:searchname/:offset/:newLimit', searchController.getPageList)
.post('/', searchController.insertSearchName)
.get('/:popular', searchController.getSearchPopular)

export default router;
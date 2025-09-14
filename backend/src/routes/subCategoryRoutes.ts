import express from 'express';
import { getSubCategories, createSubCategory } from '../controllers/subCategoryController';
const router = express.Router();

router.get('/', getSubCategories);
router.post('/', createSubCategory);

export default router;

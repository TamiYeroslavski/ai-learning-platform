import SubCategory from '../models/SubCategory';
import { Request, Response } from 'express';

export const getSubCategories = async (req: Request, res: Response) => {
  try {
    const subCategories = await SubCategory.find().populate('category_id');
    res.json(subCategories);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch sub-categories', details: err });
  }
};

export const createSubCategory = async (req: Request, res: Response) => {
  try {
    const { name, category_id } = req.body;
    if (!name || !category_id) {
      return res.status(400).json({ error: 'Name and category_id are required' });
    }
    const subCategory = new SubCategory({ name, category_id });
    await subCategory.save();
    res.status(201).json(subCategory);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create sub-category', details: err });
  }
};

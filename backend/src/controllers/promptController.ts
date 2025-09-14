import Prompt from '../models/Prompt';
import { Request, Response } from 'express';
import { getLessonFromAI } from '../services/openaiService';

export const submitPrompt = async (req: Request, res: Response) => {
  try {
    const { user_id, category_id, sub_category_id, prompt } = req.body;
    if (!user_id || !category_id || !sub_category_id || !prompt) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const aiResponse = await getLessonFromAI(prompt);
    const newPrompt = new Prompt({
      user_id,
      category_id,
      sub_category_id,
      prompt,
      response: aiResponse,
      created_at: new Date(),
    });
    await newPrompt.save();
    res.status(201).json(newPrompt);
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit prompt', details: err });
  }
};

export const getUserPrompts = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const prompts = await Prompt.find({ user_id: userId })
      .populate('category_id')
      .populate('sub_category_id');
    res.json(prompts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user prompts', details: err });
  }
};

export const getAllPrompts = async (req: Request, res: Response) => {
  try {
    const prompts = await Prompt.find()
      .populate('user_id')
      .populate('category_id')
      .populate('sub_category_id');
    res.json(prompts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch all prompts', details: err });
  }
};

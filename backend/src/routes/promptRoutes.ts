import express from 'express';
import { submitPrompt, getUserPrompts, getAllPrompts } from '../controllers/promptController';
const router = express.Router();

router.post('/', submitPrompt);
router.get('/user/:userId', getUserPrompts);
router.get('/all', getAllPrompts); // for admin

export default router;

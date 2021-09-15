const express = require('express');
import * as Controller from '../controllers/Chapter';
import CheckHeader from '../middleware/CheckHeader';
const router = express.Router();


router.post('/add-chapter',CheckHeader,Controller.AddChapter)
router.get('/get-all-chapters-for-boards',CheckHeader,Controller.GetAllChaptersForBoards);
router.get('/get-chapter-details',CheckHeader,Controller.GetChapterDetails)

export {router as ChapterRoutes};

const express = require('express');
import * as Controller from '../controllers/Model3D';
import CheckHeader from '../middleware/CheckHeader';
const router = express.Router();


router.get('/get-models-for-chapter-from-qr-code/:QRCode',CheckHeader,Controller.GetModelsForChapterFromQRCode)
router.get('/get-models-for-chapter/:chapter',CheckHeader,Controller.GetModelsForChapter)
router.get('/get-model-data',CheckHeader,Controller.GetModelData);
router.post('/add-model',CheckHeader,Controller.AddModel)

export {router as Model3DRoutes};
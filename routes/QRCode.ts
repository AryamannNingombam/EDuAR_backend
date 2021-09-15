const express = require('express');
import CheckHeader from '../middleware/CheckHeader';
import * as Controller from '../controllers/QRCode';

const router = express.Router();

router.get('/get-qr-code-for-chapter/:_id',CheckHeader,Controller.GetQRCodeForChapter)



export {router as QRCodeRoutes};
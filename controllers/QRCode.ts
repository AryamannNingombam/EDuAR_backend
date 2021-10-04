import { Request, Response, NextFunction } from 'express'
import ChapterModel, { ChapterDoc } from '../models/Chapter'
import {GenerateQRCode} from '../services/GenerateQRCode'

export const GetQRCodeForChapter = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { _id } = req.params;
  if (!_id) {
    return res.status(500).json({
      success: false,
      message: 'Required values not provided!',
    })
  }
  ChapterModel.findById({ _id })
    .then((chapter) => {
      if (chapter){
        const URL = GenerateQRCode(chapter.QRHash as string);
        return res.status(200).json({
          success: true,
          url: URL,
        })
      }
    
    })
    .catch((err) => {
      console.log('ERROR')
      console.log(err)
      return res.status(500).json({
        success: false,
        message: 'Unknown server error!',
      })
    })
}

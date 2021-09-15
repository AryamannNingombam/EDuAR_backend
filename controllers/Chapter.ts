import ChapterModel, { ChapterDoc } from '../models/Chapter'
import { Request, Response, NextFunction } from 'express'
import * as Randomstring from 'randomstring'

export const AddChapter = (req: Request, res: Response, next: NextFunction) => {
  let temp = req.body as any
  temp.QRHash = Randomstring.generate(20)
  // temp.QRHash = 'cryptoRandomString({length:20,type:"base64"})'
  const body = temp as ChapterDoc
  ChapterModel.create(body)
    .then((newChapter) => {
      console.log('New chapter created!')
      return res.status(200).json({
        success: true,
      })
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

export const GetAllChaptersForBoards = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const board = req.headers.board as string
  if (!board) {
    return res.status(500).json({
      success: false,
      message: 'Required values not provided!',
    })
  }
  ChapterModel.find({ board })
    .then((chapters) => {
      return res.status(200).json({
        success: true,
        chapters,
      })
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

export const GetChapterDetails = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { _id } = req.headers
  if (!_id) {
    return res.status(500).json({
      success: false,
      message: 'Required values not provided!',
    })
  }
  ChapterModel.findById({ _id })
    .then((chapter) => {
      return res.status(200).json({
        success: true,
        chapter,
      })
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

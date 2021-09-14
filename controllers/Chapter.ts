import ChapterModel, { ChapterDoc } from '../models/Chapter'
import { Request, Response, NextFunction } from 'express'
import GenerateHash from '../services/GenerateHash'

export const addChapter = (req: Request, res: Response, next: NextFunction) => {
  let temp = req.body as any
  temp.QRHash = GenerateHash(20)
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

export const getAllChaptersForBoards = (
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

export const getChapterDetails = (
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

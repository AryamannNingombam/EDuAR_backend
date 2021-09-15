import Model3DModel, { Model3DDoc } from '../models/Model3D'
import ChapterModel, { ChapterDoc } from '../models/Chapter'
import { Request, Response, NextFunction } from 'express'

export const GetModelsForChapterFromQRCode = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const QRCode = req.params.QRCode as string
  if (!QRCode) {
    return res.status(500).json({
      success: false,
      message: 'Required values not provided!',
    })
  }
  let chapter: ChapterDoc
  try {
    chapter = await ChapterModel.findOne({ QRHash: QRCode })
  } catch (err) {
    console.log('ERROR')
    console.log(err)
    return res.status(500).json({
      success: false,
      message: 'Wrong values provided!',
    })
  }
  Model3DModel.find({ chapter: chapter._id })
    .then((models) => {
      return res.status(200).json({
        success: true,
        models,
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

export const GetModelsForChapter = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const chapter: string = req.params.chapter as string
  if (!chapter) {
    return res.status(500).json({
      success: false,
      message: 'Required values not provided!',
    })
  }
  Model3DModel.find({ chapter })
    .then((models) => {
      return res.status(200).json({
        success: true,
        models,
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

export const AddModel = (req: Request, res: Response, next: NextFunction) => {
  const body: Model3DDoc = req.body
  Model3DModel.create(body)
    .then((newModel) => {
      console.log('New model added!')
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

export const GetModelData = (
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
  Model3DModel.findById({ _id }).then((model) => {
    return res.status(200).json({
      success: true,
      model,
    })
  })
}

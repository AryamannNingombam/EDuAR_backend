import Model3DModel, { Model3DDoc } from '../models/Model3D'
import { Request, Response, NextFunction } from 'express'





export const getModelsForChapter = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const chapter: string = req.headers.chapter as string
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

export const addModel = (req: Request, res: Response, next: NextFunction) => {
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

export const getModelData = (
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

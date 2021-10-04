import * as mongoose from 'mongoose'

const Schema = mongoose.Schema

export interface Model3DDoc extends mongoose.Document {
  modelURL: string
  chapter: string
}

const Model3DSchema = new Schema({
  modelURL: {
    type: String,
    required: [true, 'Model URL is required!'],
    unique: [true, 'Model URL must be unique'],
  },
  chapter: {
    type: Schema.Types.ObjectId,
    required: [true, 'Chapter is required!'],
  },
})

export default mongoose.model<Model3DDoc>('Model3D', Model3DSchema)

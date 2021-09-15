import * as mongoose from 'mongoose'

const Schema = mongoose.Schema

export interface ChapterDoc extends mongoose.Document {
  board: string
  name: string
  chapterNumber: number
  subject: string
  QRHash: string
  imageURL: string
  class: number
}

const ChapterSchema = new Schema({
  name: {
    type:String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  chapterNumber: {
    type: Number,
    required: true,
    min: 0,
  },
  QRHash: {
    type: String,
    required: true,
    unique: true,
  },
  imageURL: {
    type: String,
    required: true,
  },
  class: {
    type: Number,
    required: true,
    enum: [11, 12],
  },
  board: {
    type: String,
    enum: ['CBSE', 'ICSE'],
    required: true,
    default: 'CBSE',
  },
})

//generate QR hash;

export default mongoose.model<ChapterDoc>('Chapter', ChapterSchema)

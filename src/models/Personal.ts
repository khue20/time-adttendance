import { Schema, model } from 'mongoose'
const personalSchema = new Schema({
  pID: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  UserID: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
}, { timestamps: true })

const Personal = model('Personal', personalSchema, 'personal')
export default Personal
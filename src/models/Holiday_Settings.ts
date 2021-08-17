import { Schema, model } from 'mongoose'

const holidaySchema = new Schema({
  sickLeave: {
    type: Number,
    required: true
  },
  hot_Leave: {
    type: Number,
    required: true
  },
  UserID: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
}, { timestamps: true })
const Holiday = model('Holiday', holidaySchema, 'Holiday')
export default Holiday
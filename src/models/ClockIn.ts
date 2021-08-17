import { Schema, model } from 'mongoose'

const clockInSchema = new Schema({
  day: {
    type: String,
    required: true
  },
  checkIn: {
    type: String,
    required: true
  },
  checkOut: {
    type: String
  },
  date: {
    type: Date,
    required: true
  },
  UserID: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  Location: [{
    type: Number,
    required: true
  }],
}, { timestamps: true })
const ClockIn = model('ClockIn', clockInSchema, 'ClockIn')
export default ClockIn
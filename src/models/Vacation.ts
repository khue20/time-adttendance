import { Schema, model } from 'mongoose'

const vacationSchema = new Schema({
  vacation_Type: {
    type: String,
    required: true
  },
  StartDate: {
    type: Date,
    required: true
  },
  EndDate: {
    type: Date,
    required: true
  },
  reason: {
    type: String,
    required: true
  },
  stutus: {
    type: String,
    enum: ['Approve', 'Pending', 'Rejected'],
    required: true,
    default: 'Pending'
  },
  UserID: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
}, { timestamps: true })

const Vacation = model('Vacation', vacationSchema, 'Vacation')
export default Vacation
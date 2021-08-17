
import { Schema, model } from 'mongoose'

const settingSchema = new Schema({
  HourPerDay: {
    type: Number,
    required: true
  },
  dayPerWeek: {
    type: Number,
    required: true
  },
  DayPermonth: {
    type: Number,
    required: true
  }
}, { timestamps: true })

const Settings = model('Settings', settingSchema, 'Settings')
export default Settings
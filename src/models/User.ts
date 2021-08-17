import { Schema, model } from 'mongoose'
const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  mobile: {
    type: Number,
    required: true
  }
}, { timestamps: true })
const User = model('User', userSchema, 'User')
export default User
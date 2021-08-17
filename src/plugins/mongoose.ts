import {connect} from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
const dbName: string = process.env.DB_NAME || 'timeAttendance'
class Connect {
  uri: string
  constructor() {
    this.uri = `mongodb://127.0.0.1:27017/${dbName}`
  }
  async connect() {
    try {
      await connect(this.uri, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true, 
        useFindAndModify: false
      })
      console.log('Connected to', this.uri)
    } catch (err) {
      throw new Error(err)
    }
  }
}
export default Connect
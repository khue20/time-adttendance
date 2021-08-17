import { Request, Response } from 'express'
import ClockIn from '@/models/ClockIn'
import User from '@/models/User'
import moment from 'moment'

const clockInController = {
  checkIn: async (req: Request, res: Response) => {
    const { day, checkIn, date, Location } = req.body
    const auth = req.user
    try {
      const userId = await User.findOne({ _id: auth })
      const isCheck: any = await ClockIn.findOne({ date: date, UserID: userId })
      if (isCheck) return res.status(409).json({ message: 'You are already check in Today!' })
      const checkIns = new ClockIn({
        day, checkIn, checkOut: null, date, Location, UserID: userId
      })
      await checkIns.save()
      const response = {
        _id: checkIns._id,
        date: moment(checkIns.date).locale('lo').format('YYYY-MM-DD'),
        day: checkIns.day,
        checkIn: checkIns.checkIn,
        Location: checkIns.Location
      }
      res.status(200).json({ response })
    } catch (er) {
      throw new Error(er)
    }
  },
  checkOut: async (req: Request, res: Response) => {
    const { checkOut } = req.body
    const auth = req.user
    try {
      const dateToday = moment(new Date()).locale('lo').format('YYYY-MM-DD')
      const checkToday = await ClockIn.findOne({ date: dateToday, UserID: auth })
      const checkOuts = await ClockIn.findByIdAndUpdate(checkToday, {
        $set: {
          checkOut: checkOut
        }
      }, { runValidators: true, new: true })
      const checkOutMap = {
        _id: checkOuts._id,
        date: moment(checkOuts.date).locale('lo').format('YYYY-MM-DD'),
        day: checkOuts.day,
        checkIn: checkOuts.checkIn,
        checkOut: checkOuts.checkOut,
        Location: checkOuts.Location
      }
      res.status(200).json({ checkOutMap })
    } catch (e) {
      throw new Error(e)
    }
  }

}
export default clockInController
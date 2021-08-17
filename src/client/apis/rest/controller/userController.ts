import { Request, Response } from 'express'
import { loginToken, signToken } from '@/utils/jwt'
import User from '@/models/User'
import Vacation from '@/models/Vacation'
const userController = {
  login: async (req: Request, res: Response) => {
    try {
      const auth = req.user
      // console.log(auth)
      const token = signToken(auth)
      res.status(200).json({ token })
    } catch (er) {
      throw new Error(er)
    }
  },
  vacation: async (req: Request, res: Response) => {
    const { vacation_Type, StartDate, EndDate, reason } = req.body
    const auth = req.user
    try {
      const userID = await User.findOne({ _id: auth })
      const addVacation = new Vacation({
        vacation_Type, StartDate, EndDate, reason, UserID: userID
      })
      await addVacation.save()
      const vacations = { 
        _id: addVacation._id,
        vacation_Type: addVacation.vacation_type,
        startDate: addVacation.StartDate,
        endDate: addVacation.EndDate,
        reason: addVacation.reason
      }
      res.status(200).json({ vacations })
    } catch (er) {
      throw new Error(er)
    }
  }
}
export default userController
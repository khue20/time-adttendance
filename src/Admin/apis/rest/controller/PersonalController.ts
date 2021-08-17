import { Request, Response } from 'express'
import { genHash } from '@/utils/bcrypt'
import Personal from '@/models/Personal'
import User from '@/models/User'
import Holiday from '@/models/Holiday_Settings'
const personalController = {
  registerPersonal: async (req: Request, res: Response) => {
    const { pID, name, lastName, email, password, mobile } = req.body
    try {
      const isMobile = await User.findOne({ mobile })
      const isEmail = await User.findOne({ email })
      if (isMobile) return res.status(409).json({ message: 'This mobile already registered!' })
      if (isEmail) return res.status(409).json({ message: 'This Email already registered!' })
      const genHashPassword = genHash(password)
      const userModel = new User({
        email, password: genHashPassword, role: 'user', mobile
      })
      await userModel.save()
      //holiday settings 
      const holiday = new Holiday({
        sickLeave: 30, hot_Leave: 15, UserID: userModel
      })
      await holiday.save()
      //end set holiday
      const addPersonal = new Personal({
        pID, name, lastName, UserID: userModel
      })
      await addPersonal.save()
      res.status(200).json({ addPersonal })
    } catch (er) {
      throw new Error(er)
    }
  },
  getPersonalInfo: async (req: Request, res: Response) => {
    const { page, perPage }: any = req.query
    const newPage: any = parseInt(page)
    const newPerPage: any = parseInt(perPage)
    try {
      const getPersonal = await Personal.find().populate('UserID')
        .sort('-createdAt')
        .skip((newPage * newPerPage) - newPerPage)
        .limit(newPerPage)
      const total = await Personal.find().countDocuments()
      const mapper = await Promise.all(
        getPersonal.map(async (i: any) => {
          const map = {
            _id: i._id,
            name: i.name,
            lastName: i.lastName,
            userInfo: {
              email: i.UserID.email,
              mobile: i.UserID.mobile
            }
          }
          return map
        })
      )
      res.status(200).json({ mapper, total })
    } catch (er) {
      throw new Error(er)
    }
  }
}

export default personalController
import { Request, Response } from 'express'
import Holiday from '@/models/Holiday_Settings'
const personalController = {
  resetHoliday: async (req: Request, res: Response) => {
    const { sickLeave, hot_Leave } = req.body
    try {
      const alls = await Holiday.find()
      await new Promise((resolve) => setTimeout(async () => {
        alls.map(async (i: any) => {
          await Holiday.findByIdAndUpdate(i._id, {
            $set: {
              sickLeave, hot_Leave
            }
          }, { runValidators: true, new: true })
        })
        resolve('succeed')
      }, 3000))
      res.status(200).json('Update suceed!')
    } catch (er) {
      throw new Error(er)
    }
  }
}

export default personalController
import { Request, Response } from 'express'
import Settings from '@/models/Settings'

const settingController = {
  addSettings: async (req: Request, res: Response) => {
    const { HourPerDay, dayPerWeek, DayPermonth } = req.body
    try {
      const addSetting = new Settings({
        HourPerDay, dayPerWeek, DayPermonth
      })
      await addSetting.save()
      res.status(200).json({ addSetting })
    } catch (er) {
      throw new Error(er)
    }
  }
}
export default settingController
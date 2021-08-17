import { Router, Request, Response } from 'express'
import { authenticate } from 'passport'
const isUser = authenticate('isUser', { session: false })
import resetHolidayController from '../controller/resetHolidayController'
const router: Router = Router()

router.route('/holiday-settings')
.post(resetHolidayController.resetHoliday)

export default router
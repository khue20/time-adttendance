import { Router, Request, Response } from 'express'
import { authenticate } from 'passport'
const isUser = authenticate('isUser', { session: false })
import settingController from '../controller/settingController'
const router: Router = Router()

router.route('/settings')
.post(settingController.addSettings)

export default router
import { Router, Request, Response } from 'express'
import { authenticate } from 'passport'
const isUser = authenticate('isUser', { session: false })
import personalController from '../controller/PersonalController'
const router: Router = Router()

router.route('/register_personal')
.post(personalController.registerPersonal)

router.route('/personal-info')
.get(personalController.getPersonalInfo)

export default router
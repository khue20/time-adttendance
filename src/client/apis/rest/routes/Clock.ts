import { Router, Request, Response } from 'express'
import { authenticate } from 'passport'
const isUser = authenticate('isUser', { session: false })
import clockController from '../controller/clockController'
const router: Router = Router()

router.route('/checkin') 
  .post(isUser, clockController.checkIn)
router.route('/checkout')
.post(isUser, clockController.checkOut)
export default router
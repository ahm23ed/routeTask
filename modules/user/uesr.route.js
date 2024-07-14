import { Router } from "express";
import * as acontroller from './controller/user.js'
import * as validators from './user.validations.js'
import {validation} from '../../middelwear/validation.js'
import {auth} from '../../middelwear/auth.js'
const router = Router()


router.post("/signup",validation(validators.signUp),acontroller.signUp)
router.post("/signin",validation(validators.signIn),acontroller.signIn)
router.post("/requestCode",auth(),acontroller.sendCode)
router.post("/forgetPassword",auth(),validation(validators.forgetPassword),acontroller.forgetPassword)

export default router
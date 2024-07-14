import Router from "express";
import * as aController from './controller/Task.js';
import { auth } from '../../middelwear/auth.js';

const router = Router();

router.post('/createTask', auth(),aController.createTask)
router.get('/getTask', auth(false),aController.getTasks) 
router.put('/updateTask/:id', auth(),aController.updateTask)
router.delete('/deleteTask/:id', auth(),aController.deleteTask)

export default router;

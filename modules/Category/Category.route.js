import  Router  from 'express';
import * as aController from './controller/Category.js';
import { auth } from '../../middelwear/auth.js';

const router = Router();

router.post('/createCategory', auth(),aController.createCategory )
router.get('/getAllCategory', auth(),aController.getCategories )
router.get('/getCatById:id', auth(),aController.getCatById )
router.put('/updateCategory:id', auth(),aController.updateCategory )
router.delete('/deleteCategory:id', auth(),aController.deleteCategory )

export default router;

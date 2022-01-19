import { Router } from 'express';
import { ExampleController } from '../controller/ExampleController';

const router = Router();

router.use('/signup', ExampleController.signUp);
router.use('/login', ExampleController.logIn);


export default router;
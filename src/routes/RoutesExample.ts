import { Router } from 'express';
import  ExampleController  from '../controller/ExampleController';

const router = Router();

router.use('/signup', ExampleController.exampleControll);

export default router;
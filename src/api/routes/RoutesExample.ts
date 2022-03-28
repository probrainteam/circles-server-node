import { Router } from 'express';
import ExampleController from '../controllers/ExampleController';

const router = Router();

router.use('/test', ExampleController.exampleControll);
router.post('/test1', ExampleController.exampleTransaction);

export default router;

import { Router } from 'express';
import Example from './example'; 

const router = Router();

router.use('/example', Example);

export default router;
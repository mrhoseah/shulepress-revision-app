import { Router } from 'express';
import examRouter from '~/routes/exams.route';


const router = Router();

router.use('/exams',examRouter);

export default router;
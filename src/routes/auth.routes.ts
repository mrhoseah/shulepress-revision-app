import express from 'express';
import { requireUser, validateAuth } from '~/middlewares/authMiddleware';


const authRouter = express.Router();

authRouter.post('/me', requireUser);
authRouter.get('/validate', validateAuth);

export default authRouter;

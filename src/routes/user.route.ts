import express from 'express';
import { validateAuth } from '~/middlewares/authMiddleware';


const router = express.Router();

router.get('/secure-endpoint', validateAuth, (req, res) => {
  res.send('This is a secure endpoint');
});

export default router;

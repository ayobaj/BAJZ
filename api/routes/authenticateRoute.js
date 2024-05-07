import express from 'express';
import { signup } from '../controllers/authenticateControllers.js';

const router = express.Router();

router.post('/signup', signup);

export default router;
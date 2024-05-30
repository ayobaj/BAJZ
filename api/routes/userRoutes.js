import express from 'express';
import { test, updateUser } from '../controllers/userController.js';

const router = express.Router();

router.get('/test',test);
router.put('/update:userId', updateUser);


export default router;
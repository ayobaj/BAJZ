import express from 'express';
import {verifyToken} from '../utils/verifyUser.js'
import { createComment, getPostComment, likeComment } from '../controllers/commentController.js';


const router = express.Router();

router.post('/create', verifyToken,  createComment);

router.get('/getPostComment/:postId', getPostComment);

router.put('/likeComment/:commentId', verifyToken, likeComment)

export default router;
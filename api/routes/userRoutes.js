import express from 'express';
import { test, updateUser, deleteUser, signOut, getUsers } from '../controllers/userController.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/test',test);
router.put('/update/:userId', verifyToken, updateUser);
router.delete('/delete/:userId', verifyToken, deleteUser);
router.post('/signout', signOut);

// route to get the users information, visible only to the admin
router.get('/getusers', verifyToken, getUsers);






export default router;
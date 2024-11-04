import express from 'express';
import { test, updateUser, deleteUser, signOut, getUsers, getUser } from '../controllers/userController.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.put('/update/:userId', verifyToken, updateUser);
router.delete('/delete/:userId', verifyToken, deleteUser);
router.post('/signout', signOut);

// route to get the users information, visible only to the admin
router.get('/getusers', verifyToken, getUsers);

//route to get user data to the comment section based on each comment made by the user
router.get('/:userId', getUser);




export default router;
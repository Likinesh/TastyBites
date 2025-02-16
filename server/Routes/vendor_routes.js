import express from 'express';
import { user_reg, user_login, getAllusers, getuserByID } from '../controller/r_user.controller.js';
const router = express.Router();

// Define routes for user registration and login
router.post('/register', user_reg);
router.post('/login', user_login);
router.get('/allvendors',getAllusers);
router.get('/getuser/:id',getuserByID)

export default router;
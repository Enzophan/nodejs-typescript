import express from 'express';
import UserController from '../controllers/users.controller'


const router = express.Router();

router.post('/create', UserController.CreateUser)
router.get('/', UserController.GetUsers)

export default router
import express from 'express';
import MenuController from '../controllers/menu.controller'

const router = express.Router();

router.post('/', MenuController.GetMenu)

export default router;
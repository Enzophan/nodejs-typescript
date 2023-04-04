import express from 'express';
import TodoValidator from '../validator/todos.validator'
import { handleValidationError } from '../middleware';
import { createTodo, readTodos, readTodo, updateTodo, deteleTodo } from '../controllers/todos.controller'


const router = express.Router();

router.post('/create', TodoValidator.checkCreateTodo(), handleValidationError, createTodo)
router.get('/read', TodoValidator.checkReadTodo(), handleValidationError, readTodos)
router.get('/read/:id', TodoValidator.checkIdParams(), handleValidationError, readTodo)
router.put('/update/:id', TodoValidator.checkUpdateTodo(), handleValidationError, updateTodo)
router.delete('/delete/:id', TodoValidator.checkIdParams(), handleValidationError, deteleTodo)

export default router
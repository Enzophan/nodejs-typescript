import express from 'express';
import TodoValidator from '../validator/todos.validator'
import { handleValidationError } from '../middleware';
import { createTodo, readTodos, readTodo, updateTodo, deteleTodo } from '../controllers/todos.controller'


const router = express.Router();

router.post('/todos/create', TodoValidator.checkCreateTodo(), handleValidationError, createTodo)
router.get('/todos/read', TodoValidator.checkReadTodo(), handleValidationError, readTodos)
router.get('/todos/read/:id', TodoValidator.checkIdParams(), handleValidationError, readTodo)
router.put('/todos/update/:id', TodoValidator.checkUpdateTodo(), handleValidationError, updateTodo)
router.delete('/todos/delete/:id', TodoValidator.checkIdParams(), handleValidationError, deteleTodo)

export default router
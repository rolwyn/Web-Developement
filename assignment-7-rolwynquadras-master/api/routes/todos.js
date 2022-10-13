import express from 'express'
import * as todoController from '../controllers/todo.js'

const router = express.Router();

/**
 * all urls will here here
 * get      - get all data
 * post     - add new data
 * put      - update on existing data
 * delete   - delete the data from db
 */
router.route('/todos')
    .get(todoController.getAllTodos)
    .post(todoController.saveTodo)

router.route('/todos/:id')
.get(todoController.getTodoById)
.put(todoController.updateTodoById)
.delete(todoController.removeTodoById)

export default router
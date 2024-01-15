const express = require('express')
const router = express.Router()
const todoController = require('../controllers/todoController')

router.get('/', todoController.getAllTodoItems)
router.post('/',todoController.createTodoItem)
router.get('/:id', todoController.getSpecificTodoItem)
router.put('/:id', todoController.updateTodoItem)
router.delete('/:id', todoController.deleteTodoItem)


module.exports = router
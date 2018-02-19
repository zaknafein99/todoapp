var express = require('express');
var router = express.Router();

var TodoController = require('../../controllers/todos.controller');

// Map each API to the controller function
router.get('/', TodoController.getTodos);
router.post('/', TodoController.createTodo);
router.put('/', TodoController.updateTodo);
router.delete('/', TodoController.removeTodo);

module.exports = router;
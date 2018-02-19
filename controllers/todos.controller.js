// Accesing the service we just created

var TodoService = require('../services/todo.service');

// Saving the context in this module inside the _the variable
_this = this;

// Async controller function to get the todo list
exports.getTodos = async function(req, res, next){
    // Check the existence of the query parameters, if it don't assign a default value
    var page = req.query.page ? req.query.page : 1;
    var limit = req.query.limit ? req.query.limit : 10;

    try{
        var todos = await TodoService.getTodos({}, page, limit);

        // Retunr the todos list with the appropiate HTTP status code and message
        return res.status(200).json({status: 200, data: todos, message: 'Successfully todos recieved'});
    }catch(e){
        // Return an error response with code and message
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.createTodo = async function(req, res, next){
    // Req.body contains the form submit values
    var todo = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status
    }
    try{
        // Calling the service function with the new object from the request body
        var createdTodo = await TodoService.createTodo(todo)
        return res.status(201).json({status: 201, data: createdTodo, message: 'Succesfully created new todo'});
    }catch(e){
        return res.status(400).json({status: 400, message: 'Todo creation unsuccesfull'});
    }
}

exports.updateTodo = async function(req, res, next){
    if(!req.body._id){
        return res.status(400).json({status: 400, message: 'Id must be present'});
    }

    var id = req.body._id;
    console.log(req.body);

    var todo = {
        id,
        title: req.body.title ? req.body.title : null,
        description: req.body.description ? req.body.description : null,
        status: req.body.status ? req.body.status : null
    }

    try{
        updatedTodo = await TodoService.updateTodo(todo);
        return res.status(200).json({status: 200, data: updatedTodo, message: 'Succesfully updated todo'});
    }catch(e){
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.removeTodo = async function(req, res, next){
    var id = req.params.id;

    try{
        var deleted = await TodoService.deleteTodo(id);
        return res.status(204).json({status: 204, message: 'Succesfully deleted todo'});
    }catch(e){
        return res.status(400).json({status: 400, message: e.message});
    }
}
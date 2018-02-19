// Gettin the Newly created MongoDB model we just created

var ToDo = require('../models/todo.model');

// Saving the context of this module inside the _the variable
_this = this;

// Async function to get the To Do list
exports.getTodos = async function(query, page, limit){
    //Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }

    // Try Catch the awaited promise to handle the error
    try{
        var todos = await ToDo.paginate(query, options)

        // Return the todo list that was returned by the mongoose promise
        return todos;
    }catch(e){
        throw Error('Error while paginating todos')
    }

    exports.createTodo = async function(todo){
        // Creating a new mongoose object by using the new keyword
        var newTodo = new ToDo({
            title: todo.title,
            description: todo.description,
            date: todo.date,
            status: todo.status
        })

        try{
            // Save the todo
            var savedTodo = await newTodo.save()

            return savedTodo
        }catch(e){
            throw Error("Error while creating the todo")
        }
    }

    exports.updateTodo = async function(todo){
        var id = todo.id;

        try{
            // FInd the old todo by the id
            var oldTodo = await ToDo.findById(id);

        }catch(e){
            throw Error("Error ocurred while finding the todo");
        }

        // If no old todo object exists return false
        if(!oldTodo){
            return false;
        }

        console.log(oldTodo);

        // Edit the todo object
        try{
            var savedTodo = await oldTodo.save();
            return savedTodo;
        }catch(e){
            throw Error("An error ocured while updating the todo");
        }
    } 

    exports.deleteTodo = async function(id){
        // Delete the todo
        try{
            var deleted = await ToDo.remove({_id: id});
            if(deleted.result.n === 0){
                throw Error("Todo could not be deleted");
            }
            return deleted;
        }catch(e){
            throw Error("Error ocurred while deleting the todo")
        }
    }

}
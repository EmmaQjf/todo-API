const Todo = require('../models/todo')

exports.getAllTodoItems = async(req, res) => {
    try {
        const foundTodos = await Todo.find({});
        res.json(foundTodos)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

exports.createTodoItem = async(req, res) => {
    try {
        const newTodo = await Todo.create(req.body)
        res.json(newTodo)
    } catch(error){
        res.status(400).json({message: error.message})
    }
}

exports.getSpecificTodoItem = async(req, res) => {
    try {
        const foundTodo = await Todo.find({_id: req.params.id})
        res.json(foundTodo)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

exports.updateTodoItem= async(req, res)=> {
    try {
        const updatedTodo = await Todo.findOneAndUpdate({_id: req.params.id},req.body,{new:true})
        res.json(updatedTodo)
    }catch(error) {
        res.status(400).json({message: error.message})
    }
}

exports.deleteTodoItem = async(req, res) => {
    try {
        await Todo.findOneAndDelete({_id: req.params.id})
        res.json('item deleted')
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

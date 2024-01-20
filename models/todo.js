const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    title: {type: String, required:true},
    description: String,
    completed: {type: Boolean, default:true},
    }, {
        timestamps: true
    })

const Todo = mongoose.model('Todo',todoSchema)

module.exports = Todo
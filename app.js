const express = require ('express')
const morgan = require('morgan')
// const mongoose = require('mongoose')
// const Todo = require('./models/todo')
const todoRoute = require('./routes/todoRoute')
const app = express()

//middleware
app.use(express.urlencoded({extended: true}))
// added middle ware for app.use(express.json()) because MongoDB Validation Error: Title Path is Required
app.use(express.json())
app.use(morgan('combined'))
app.use('/todos', todoRoute)

// app.get('/todos', async(req, res) => {
//     try {
//         const foundTodos = await Todo.find({});
//         res.send(foundTodos)
//     } catch (error) {
//         res.status(400).send({message: error.message})
//     }
// })

// app.post('/todos', async(req, res) => {
//     try {
//         const newTodo = await Todo.create(req.body)
//         res.send(newTodo)
//     } catch(error){
//         res.status(400).send({message: error.message})
//     }
// })

// app.get('/todos/:id', async(req, res) => {
//     try {
//         const foundTodo = await Todo.foundOne({_id: req.params.id})
//         res.send(foundTodo)
//     } catch (error) {
//         res.status(400).send({message: error.message})
//     }
// })

// app.put('/todos/:id', async(req, res)=> {
//     try {
//         const updatedTodo = await Todo.findOneAndUpdate({_id: req.params.id})
//         res.send(updatedTodo)
//     }catch(error) {
//         res.status(400).send({message: error.message})
//     }
// })


// app.delete('/todos/:id', async(req, res) => {
//     try {
//         const deletedTodo = await Todo.findOneAndDelete({_id: req.params.id})
//         res.send(deletedTodo)
//     } catch (error) {
//         res.status(400).send({message: error.message})
//     }
// })

module.exports = app
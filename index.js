require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const cors = require('cors')
const {ToDo} = require("./models/models");

const PORT = 3100

const app = express()
app.use(cors())
app.use(express.json())

app.get('/api/todos', async (req, res) => {
    try {
        const todo = await ToDo.findAll()
        res.status(200).json({todo})
    } catch (e) {
        res.status(500).json({message: " Error"})
    }
})

app.get('/api/todos/:id', async (req, res) => {
    try {
        const todo = await ToDo.findByPk(req.params.id)
        if (todo){
            res.status(200).json({todo})
        } else {
            res.status(404).json({message: "Ошибка! ID не обнаружен!"})
        }
    } catch (e) {
        res.status(500).json({message: " Error"})
    }
})

app.post('/api/todos', async (req, res) => {
    try {
        const todo = await ToDo.create({
            title: req.body.title,
            description: req.body.description,
            isDone: req.body.isDone
        })
        res.status(200).json({message: "Добавлено | id: " + todo.id})
    } catch (e) {
        res.status(500).json({message: " Error"})
    }
})

app.patch('/api/todos/:id', async (req, res) => {
    try {
        const todo = await ToDo.findByPk(req.params.id)
        todo.update({
            title: req.body.title,
            description: req.body.description,
            isDone: req.body.isDone
        })
        res.status(200).json({message: "Изменена TODOшка | id: " + req.params.id})
    } catch (error) {
        res.status(500).json({message: " Error"})
    }
})

app.delete('/api/todos/:id', async (req, res) => {
    try {
        const todo = await ToDo.findByPk(req.params.id)
        if (todo) {
            await todo.destroy()
            res.status(200).json({message: "TODOшка с id: " + req.params.id + " была удалена"})
        }
        else {
            res.status(404).json({message: "TODO с id: " + req.params.id + " не обнаружена"})
        }
    } catch (error) {
        res.status(500).json({message: "Error"})
    }
})

app.delete('/api/todos/', async (req, res) => {
    try {
        await ToDo.destroy({where: {}})
        res.status(200).json({message: "Все TODOшки были успешно удалены"})
    } catch (error) {
        res.status(500).json({message: "Error"})
    }
})

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}


start()

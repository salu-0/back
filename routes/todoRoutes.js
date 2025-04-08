const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

router.post("/", async (req, res) => {
    try {
        const newTodo = new Todo(req.body);
        const savedTodo = await newTodo.save();
        res.status(201).json(savedTodo); // Return just the new todo instead of full list
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const todos = await Todo.find().sort({ _id: -1 }); // Sort by newest first
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const todo = await Todo.findByIdAndUpdate(
            req.params.id,
            {
                text: req.body.text,
                completed: req.body.completed
            },
            { new: true, runValidators: true }
        );
        
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        
        res.status(200).json(todo); // Return updated todo
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.status(200).json(todo); // Return deleted todo
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

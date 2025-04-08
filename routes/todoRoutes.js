const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

router.post("/", async (req, res) => {
    try {
        const newTodo = new Todo(req.body);
        await newTodo.save();
        res.status(201).json({ message: "Todo created successfully!" });
    } catch (error) {
        console.error('Error creating todo:', error);
        res.status(500).json({ message: "Server error occurred. Please try again later.", error: error.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch (error) {
        console.error('Error fetching todos:', error);
        res.status(500).json({ message: "Server error occurred. Please try again later.", error: error.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        if (!req.params.id) {
            return res.status(400).json({ message: "Todo ID is required" });
        }
        const todo = await Todo.findById(req.params.id);
        if (todo) {
            todo.text = req.body.text || todo.text;
            todo.completed = req.body.completed !== undefined ? req.body.completed : todo.completed;
            await todo.save();
            res.status(200).json({ message: "Todo updated successfully!" });
        } else {
            res.status(404).json({ message: 'Todo not found' });
        }
    } catch (error) {
        console.error('Error updating todo:', error);
        res.status(500).json({ message: "Server error occurred. Please try again later.", error: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        if (!req.params.id) {
            return res.status(400).json({ message: "Todo ID is required" });
        }
        
        const todo = await Todo.findById(req.params.id);
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        await todo.deleteOne(); // Using deleteOne() instead of findByIdAndDelete
        res.status(200).json({ message: "Todo deleted successfully!" });
    } catch (error) {
        console.error('Error deleting todo:', error);
        res.status(500).json({ message: "Server error occurred. Please try again later.", error: error.message });
    }
});

module.exports = router;

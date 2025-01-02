
const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');


const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Welcome to the Task Management API!');
});


const dbFile = 'tasks.json';
let tasks = [];


if (fs.existsSync(dbFile)) {
    tasks = JSON.parse(fs.readFileSync(dbFile));
}


const saveTasks = () => {
    fs.writeFileSync(dbFile, JSON.stringify(tasks, null, 2));
};



app.post('/tasks', (req, res) => {
    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).json({ message: 'Title and description are required.' });
    }

    const newTask = {
        id: uuidv4(),
        title,
        description,
        status: 'pending',
    };

    tasks.push(newTask);
    saveTasks();
    res.status(201).json(newTask);
});


app.get('/tasks', (req, res) => {
    res.json(tasks);
});


app.get('/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === req.params.id);
    if (!task) {
        return res.status(404).json({ message: 'Task not found.' });
    }
    res.json(task);
});


app.put('/tasks/:id', (req, res) => {
    const { status } = req.body;
    const validStatuses = ['pending', 'in-progress', 'completed'];

    if (!validStatuses.includes(status)) {
        return res.status(400).json({ message: `Status must be one of: ${validStatuses.join(', ')}.` });
    }

    const task = tasks.find(t => t.id === req.params.id);
    if (!task) {
        return res.status(404).json({ message: 'Task not found.' });
    }

    task.status = status;
    saveTasks();
    res.json(task);
});


app.delete('/tasks/:id', (req, res) => {
    const taskIndex = tasks.findIndex(t => t.id === req.params.id);

    if (taskIndex === -1) {
        return res.status(404).json({ message: 'Task not found.' });
    }

    tasks.splice(taskIndex, 1);
    saveTasks();
    res.status(204).send();
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

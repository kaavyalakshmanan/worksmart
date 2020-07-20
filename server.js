// Backend framework
const express = require('express');
// Interact with MongoDB
const mongoose = require('mongoose');
// Get data from request body
const bodyParser = require('body-parser');

const todos = require('./routes/api/todos');

const app = express();

// Bodyparser middleware
app.use(bodyParser.json());

// DB config
const db = require('./config/keys').mongoURI;

// Connet to Mongo
mongoose
    .connect(db)
    .then(() => console.log('Mongo DB connected'))
    .catch(err => console.log(err));

// Use Routes
app.use('/api/todos', todos);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
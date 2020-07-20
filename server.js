// Backend framework
const express = require('express');
// Interact with MongoDB
const mongoose = require('mongoose');
// Get data from request body
const bodyParser = require('body-parser');
// File path when deploying to heroku
const path = require('path');

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

// Serve static assets if we are in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
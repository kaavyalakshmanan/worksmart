// Backend framework
const express = require('express');
// Interact with MongoDB
const mongoose = require('mongoose');

// File path when deploying to heroku
const path = require('path');

const config = require('config')

const app = express();

// Bodyparser middleware
app.use(express.json());

// DB config
const db = config.get('mongoURI');

// Connet to Mongo
mongoose
    .connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    }) //Adding new mongo url parser
    .then(() => console.log('Mongo DB connected'))
    .catch(err => console.log(err));

// Use Routes
app.use('/api/todos', require('./routes/api/todos'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

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

process.on('SIGINT', function() {
    console.log( "\nGracefully shutting down from SIGINT (Ctrl-C)" );
    // some other closing procedures go here
    process.exit(1);
  });
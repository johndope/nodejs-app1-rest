const express = require('express');
// Initialize
const app = express();

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

// Import routes
const postsRoute = require('./routes/posts');

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
    // This will get called everytime a request comes
    console.log('Route initiated...');
    next();
});

// All access to /posts will use the routes in post.js
app.use('/posts', postsRoute);

// Default route
app.get('/', (req, res) => {
    res.send('Hello from node');
});

// Moved to posts.js instead of having here in app.js
// app.get('/posts', (req, res) => {
//     res.send('We are on post now');
// });
try {

    mongoose.connect(
        process.env.DB_CONNECTION,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        () => {
            console.log('DB connected');
        }
        );
}
catch (error) {
    console.log('DB Init Connection Error...');
    console.log(error);
}

mongoose.connection.on('error', err => {
    console.log('DB Connection Error...');
    console.log(err);
});

app.listen('3100');
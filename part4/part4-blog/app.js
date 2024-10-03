const config = require('./utils/config');
const express = require('express');
require('express-async-errors');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');

const blogRouter = require('./controllers/blogs');
const userRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');

const logger = require('./utils/logger');
const middleware = require('./utils/middleware');
const mongoose = require('mongoose');

// Async function to connect to MongoDB
const connectToMongoDB = async () => {
    await mongoose.connect(config.MONGODB_URI);
    logger.info('Connected to MongoDB');
};
const listHelper = require('./utils/list_helper');

listHelper.mostBlogs(listHelper.blogs);
// Connect to MongoDB

listHelper.mostLikes(listHelper.blogs);
connectToMongoDB();

// Middleware
app.use(cors());
app.use(express.json());
// app.use(middleware.requestLogger);

app.use(middleware.tokenExtractor);
app.use('/api/blogs', middleware.userExtractor, blogRouter);
app.use(middleware.errorHandler);

// Routes
app.use('/api/login', loginRouter);
app.use('/api/blogs', blogRouter);
app.use('/api/users', userRouter);

console.log('PORT:', config.PORT); // Add this to verify the value of PORT

module.exports = app;

const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

// GET all blogs
blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {
        username: 1,
        name: 1,
    });
    response.status(200).json(blogs);
});

// GET a specific blog by ID
blogRouter.get('/:id', async (request, response) => {
    const id = request.params.id;

    const blog = await Blog.findById(id);
    if (blog) {
        response.json(blog);
    } else {
        response.status(404).json({ error: 'Blog not found' });
    }
});

// POST a new blog
blogRouter.post('/', async (request, response) => {
    const body = request.body;
    const user = request.user;

    // if token matches we can fetch user from the database

    const dbUser = await User.findById(user.id);

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id,
    });
    const savedBlog = await blog.save();
    dbUser.blogs = dbUser.blogs.concat(savedBlog._id);
    await dbUser.save();

    response.status(201).json(savedBlog);
});

blogRouter.delete('/:id', async (request, response) => {
    // Verify the token to get the user's ID
    const user = request.user;

    // Find the blog by the ID from the URL
    const blog = await Blog.findById(request.params.id);
    if (!blog) {
        return response.status(404).json({ error: 'Blog not found' });
    }

    // Check if the blog belongs to the user making the request
    if (blog.user.toString() !== user.id) {
        return response
            .status(401)
            .json({ error: 'You are not authorized to delete this blog post' });
    }

    // Delete the blog from the Blog collection
    await Blog.findByIdAndDelete(request.params.id);

    // Now update the user to remove the reference to the deleted blog
    await User.findByIdAndUpdate(blog.user, { $pull: { blogs: blog._id } });

    // Send a successful response
    response.status(204).end();
});

blogRouter.put('/:id', async (request, response) => {
    const body = request.body;

    const blog = {
        likes: body.likes,
    };

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
        new: true,
    });
    if (updatedBlog) {
        response.json(updatedBlog);
    } else {
        response.status(404).end();
    }
});

module.exports = blogRouter;

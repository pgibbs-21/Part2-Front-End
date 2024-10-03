const { test, after, beforeEach, describe, expect } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);

const Blog = require('../models/blog');
const { blogs } = require('../utils/list_helper');

const initialBlogPost = [
    {
        title: 'First Blog Post',
        author: 'Coco',
        url: 'coco.com',
        likes: 1200,
    },
    {
        title: 'Second Blog Post',
        author: 'Fiona',
        url: 'fiona.com',
        likes: 2000,
    },
];

beforeEach(async () => {
    await Blog.deleteMany({});

    let blogObject = new Blog(initialBlogPost[0]);
    await blogObject.save();

    blogObject = new Blog(initialBlogPost[1]);
    await blogObject.save();
});

// describe('exercise 4.8', () => {
//     //test GET request to api/blogs
//     //test that it posts in JSON format

//     test('get request is succesful and blogs are returned as json', async () => {
//         await api
//             .get('/api/blogs')
//             .expect(200)
//             .expect('Content-Type', /application\/json/);
//     });

//     //verify that it returns the correct amount of blog posts/objects

//     test('there are two blog posts', async () => {
//         const response = await api.get('/api/blogs');

//         assert.strictEqual(response.body.length, 2);
//     });
// });

// describe('exercise 4.9', () => {
//     test('verify that the _id property assigned in Atlas has been changed to id', async () => {
//         const response = await api.get('/api/blogs');

//         response.body.forEach((blog) => {
//             assert(blog.id);
//             assert(!blog._id);
//         });
//     });
// });

describe('exercise 4.10', () => {
    test('HTTP POST is succsesful and the blogs length is increased by 1', async () => {
        const newBlog = {
            title: 'Ramzies Wise Word from Beyond the Pail',
            author: 'Ramzies',
            url: 'ramzies.com',
            likes: 3000000,
            user: '66faf074a916521a9581aa14',
        };
        // Get the blogPost before posting
        const blogsBeforePost = await api.get('/api/blogs');
        //Post the new blog and test the response code
        await api.post('/api/blogs').send(newBlog).expect(201);
        // Get the new Blogs Array
        let blogsAfterPost = await Blog.find({});
        // Change the atlas document into JSON so you can compare it
        blogsAfterPost = blogsAfterPost.map((blog) => blog.toJSON());

        //check if the length of blogs incresed by 1

        assert.strictEqual(
            blogsAfterPost.length,
            blogsBeforePost.body.length + 1
        );
    });
});

// describe('exercise 4.11', () => {
//     test('verify likes', async () => {
//         const response = await api.get('/api/blogs/');
//         const blogLikes = response.body.every((blog) => blog.likes !== null);

//         assert.strictEqual(blogLikes, true);
//     });
// });

// describe('exercise 4.12', () => {
//     test('if no URL or Title send a 400 Bad Request', async () => {
//         const newBlogWithoutTitlOrUrl = {
//             // title: 'Ramzies Wise Word from Beyond the Pail',
//             author: 'Ramzies',
//             url: 'ramzies.com',
//             likes: 30000000,
//         };
//         await api.post('/api/blogs').send(newBlogWithoutTitlOrUrl).expect(400);
//     });
// });

// describe('exercise 4.13', () => {
//     test('deleting a single blog post', async () => {
//         //Grabbing from MONGODB so I can get the unique ID assigned to it
//         const blogDocsFromAtlas = await Blog.find({});
//         const blogBeforeDelete = blogDocsFromAtlas.map((blog) => blog.toJSON());

//         const idArray = blogBeforeDelete.map((blog) => blog.id);

//         const deleteResponse = await api
//             .delete(`/api/blogs/${idArray[0]}`)
//             .expect(204);

//         const blogAfterDelete = await Blog.find({});
//         const blogAfterDeleteJSON = blogAfterDelete.map((blog) =>
//             blog.toJSON()
//         );

//         assert.strictEqual(
//             blogAfterDeleteJSON.length,
//             blogBeforeDelete.length - 1
//         );
//     });
// });

// describe('exercise 4.14', () => {
//     test('blog was updated succesfully', async () => {
//         const blogsAtStart = await api.get('/api/blogs');
//         const blogToUpdate = blogsAtStart.body[0];

//         const updatedLikes = {
//             likes: blogToUpdate.likes + 200,
//         };

//         const response = await api
//             .put(`/api/blogs/${blogToUpdate.id}`)
//             .send(updatedLikes)
//             .expect(200)
//             .expect('Content-Type', /application\/json/);

//         const blogsAtEnd = await api.get('/api/blogs');
//         const updatedBlogFromDb = blogsAtEnd.body.find(
//             (b) => b.id === blogToUpdate.id
//         );

//         assert.strictEqual(
//             updatedBlogFromDb.likes,
//             blogToUpdate.likes + 200,
//             'The likes should be incremented by 200'
//         );
//     });
// });
after(async () => {
    await mongoose.connection.close();
});

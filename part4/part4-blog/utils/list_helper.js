const _ = require('lodash');

const blogs = [
    { author: 'Michael Chan', title: 'React patterns', likes: 32 },
    {
        author: 'Edsger W. Dijkstra',
        title: 'Go To Statement Considered Harmful',
        likes: 12,
    },
    {
        author: 'Edsger W. Dijkstra',
        title: 'Canonical string reduction',
        likes: 15,
    },
    { author: 'Robert C. Martin', title: 'First class tests', likes: 88 },
    { author: 'Robert C. Martin', title: 'TDD harms architecture', likes: 7 },
    { author: 'Robert C. Martin', title: 'Type wars', likes: 55 },
];

const dummy = (blogs) => {
    return 1;
};

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
    const maxLikes = Math.max(...blogs.map((blog) => blog.likes)); // returns mostLikes from the blogs
    return blogs.find((blog) => blog.likes === maxLikes); //returns the blog with the most likes
};

const mostBlogs = (blogs) => {
    const authorBlogCounts = _.countBy(blogs, 'author');
    const authorMostBlogs = _.maxBy(
        Object.entries(authorBlogCounts),
        ([, blogCount]) => blogCount
    );
};

const mostLikes = (blogs) => {
    const totalLikesPerAuthor = blogs.reduce((acc, blog) => {
        // If the author already exists in the accumulator, add the likes to their current total
        if (acc[blog.author]) {
            acc[blog.author] += blog.likes;
        } else {
            // Otherwise, initialize the author's likes with the current blog's likes
            acc[blog.author] = blog.likes;
        }
        return acc;
    }, {}); // {} is the initial value of the accumulator
    const authorMostLikes = _.maxBy(
        Object.entries(totalLikesPerAuthor),
        ([, maxLikes]) => maxLikes
    );
};

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    blogs,
    mostLikes,
};

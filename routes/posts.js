const express = require('express');
const router = express.Router();
const Post = require('../models/Post'); // include the model

// Return all posts when for GET requests
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    }
    catch (err) {
        res.json({message: err});
    }
});

// Create new post when POST request is called
router.post('/', async (req, res) => {
    
    // Create model with data
    const post = new Post({
        title: req.body.title,
        description: req.body.description,
    });

    try {
        // Save the in DB
        const savedPost = await post.save();
        res.json(savedPost);
    }
    catch (err) {
        res.json({ message: err });
    }
    // User cleaner request using async/await
    // post.save()
    // .then(data => {
    //     res.json(data);
    // })
    // .catch(err => {
    //     res.json({ message: err});
    // });
});

// Get a specific post
router.get('/:postId', async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        res.json(post);
    }
    catch (err) {
        res.json({ message: err });
    }
});

// Delete post
router.delete('/:postId', async (req, res) => {
    try {
        const removedPost = await Post.remove({ _id: req.params.postId });
        res.json(removedPost);
    }
    catch (err) {
        res.json({ message: err });
    }
});

// Update post
router.patch('/:postId', async (req, res) => {
    try {
        const updatedPost = await Post.updateOne({ _id: req.params.postId },
            {
                $set: {
                    title: req.body.title
                }
            });
        res.json(updatedPost);
    }
    catch (err) {
        res.json({message: err});
    }
});

module.exports = router; 
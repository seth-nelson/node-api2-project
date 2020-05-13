const express = require('express');
const router = express.Router();
const db = require('../data/db');


// insert post function (req.body)
router.post('/', (req, res) => {
    const newPost = req.body;
    if(newPost.title === '' || newPost.contents === '') {
        res.status(400).json({ message: "Please provide title and contents for the the post." });
    } else {
        db.insert(newPost)
            .then(addedPost => {
                res.status(201).json(addedPost);
            })
            .catch(err => {
                res.status(500).json({ message: "There was an error saving the post to the database" });
            });
    }
});


// insert post function for comments and id (findPostComments)
router.post('/:id/comments', (req, res) => {
    const { id } = req.params;
    db.findPostComments(id)
    .then(commment => {
        res.status(201).json(searchPost);
    })
    .catch(err => {
        res.status(500).json({ message: "The comment information could not be retrieved" });
    });
});


//insert get function
router.get('/', (req, res) => {
    db.find()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(err => {
        res.status(500).json({ messgae: "The information could not be recieved" });
    });
});


// insert get function for id
router.get('/:id', (req, res) => {
    const { id } = req.params
    db.findPostComments(id)
    .then(comment => {
        if(comment.length > 0) {res.status(200).json(users)

        } else {
            res.status(500).json({ message: "The user with this specific id doesn't exist" });
        }
    })
    .catch(err => {res.status(500).json({ message: "The information was not recieved" });
    });
});

// insert get function for comments and id
router.get('/:id/comments', (req, res) => {
    const { id } = req.params
});

// insert delete function for id
router.delete('/:id', (req, res) => {
    const { id } = req.params
});

// insert put fucntion for id
router.put('/:id', (req, res) => {
    const { id } = req.params
});


module.exports = router;
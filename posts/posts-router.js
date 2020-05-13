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


//insert get function (find)
router.get('/', (req, res) => {
    db.find()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(err => {
        res.status(500).json({ error: "The posts information could not be retrieved." });
    });
});


// insert get function for id (findById)
router.get('/:id', (req, res) => {
    const { id } = req.params
    db.findById(id)
    .then(users => {
        if(users.length > 0) {res.status(200).json(users)

        } else {
            res.status(404).json({ message: "The post with the spesified ID does not exist." });
        }
    })
    .catch(err => {res.status(500).json({ message: "The information was not recieved" });
    });
});


// insert get function for comments and id (findPostComments)
router.get('/:id/comments', (req, res) => {
    const { id } = req.params
    db.findPostComments(id)
    .then(comment => {
        if(comment.length > 0) {
            res.status(200).json(comment)
        } else {
            res.status(404).json({ message: "The post with the specified id doesn't exist." })
        }
    })
    .catch(err => {
        res.status(500).json({ error: "The comments information could not be retrieved." })
    })
});


// insert delete function for id
router.delete('/:id', (req, res) => {
    const { id } = req.params
    db.remove(id)
    .then(removePost => {
        res.status(200).json(removePost);
    })
    .catch(err => {
        res.status(500).json({ error: "The post could not be removed." })
    })
});


// insert put fucntion for id (req.body and update)
router.put('/:id', (req, res) => {
    const { id } = req.params
    const body = req.body
    db.findById(id)
    .then(userId => {
        if (userId.length < 0) {
            res.status(404).json({ message: "The post with the specified ID does not exist" })
        } else if (body.title === '' || body.contents === '') {
            res.status(400).json({ message: "Please provide title and contents for the post." });
        } else {
            (body.title && body.contents)
            db.update(id, body)
            .then(update => {
                res.status(200).json(body)
            })
            .catch(err => {
                res.status(500).json({ error: "The post information voulf not br modified." });
            })
        }
    })
});


module.exports = router;
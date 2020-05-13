const express = require('express');
const router = express.Router();
const db = require('../data/db');


// insert post function (req.body)
// works
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
// Does not work
router.post('/:id/comments', (req, res) => {
    const { id } = req.params;
    const newComment = { ...req.body, post_id: id}
    if (typeof newComment.text === 'undefined') {
        res.status(400).json({ errorMessage: "Please provide text for the comment" });
    } else {
        db.insertComment(newComment)
        .then(addedComment => {
            if (addedComment) {
                res.status(201).json(addedComment);
            } else {
                res.status(404).json({ message: "The post with the specified id does not exist" });
            }
        })
        .catch(err => {
            res.status(500).json({ error: "There was an error while saving the comment to the database." });
        });
    }
});


// insert get function (find)
// Works
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
// works
router.get('/:id', (req, res) => {
    const { id } = req.params
    db.findById(id)
    .then(users => {
        if(users.length > 0) {res.status(200).json(users)

        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." });
        }
    })
    .catch(err => {res.status(500).json({ message: "The information was not recieved" });
    });
});


// insert get function for comments and id (findPostComments)
// does not work
router.get('/:id/comments', (req, res) => {
    const { id } = req.params
    db.findPostComments(id)
    .then(comment => {
        if(comment === '') {
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
// works
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
// does not work
router.put('/:id', (req, res) => {
    const { id } = req.params
    const editPost = req.body
    if (typeof editPost.title === "undefined" || typeof editPost.contents === "undefined") {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
    } else {
        db.update(id, editPost)
            .then(updatePost => {
                if (updatePost) {
                    res.status(200).json(updatedPost);
                } else {
                    res.status(404).json({ message: "The post with the specified id does not exist." });
                }
            })
            .catch(err => {
                res.status(500).json({ error: "The post information could not be modified." });
            });
    }
});


module.exports = router;
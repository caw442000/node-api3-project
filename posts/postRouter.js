const express = require('express');

const Posts = require('./postDb.js')


const router = express.Router();

router.get('/', (req, res) => {
  // do your magic!
  Posts.get()
  .then(post => {
    res.status(200).json(post)
  })
  .catch(err => {
    res.status(500).json({error: "unable to retrieve posts" })
  })
});

router.get('/:id',validatePostId, (req, res) => {
  // do your magic!
  Posts.getById(req.params.id)
  .then(post => {
    res.status(200).json(post)
  })
  .catch(error => {
    res.status(500).json({error: "unable to locate post"})
  })
});

router.delete('/:id', validatePostId, (req, res) => {
  // do your magic!
  Posts.remove(req.params.id)
  .then(post => {
    res.status(200).json(post)
  })
  .catch(error => {
    res.status(500).json({error: "unable to delete post"})
  })
});

router.put('/:id', validatePostId, (req, res) => {
  // do your magic!
  Posts.update(req.params.id, req.body)
  .then(post => {
    res.status(200).json(post)
  })
  .catch(err => {
    res.status(500).json({error: "unable to update post"})
  })
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
  Posts.getById(req.params.id)
  .then(post => {
    if(post){
      console.log('validated post id')
      next()  
    } else {
      res.status(400).json({ message: "invalid post id"})
    }
  })
  .catch(err => {
    res.status(500).json({ error: "Error retrieving post"})
  })
}

module.exports = router;

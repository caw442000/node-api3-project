const express = require('express');

const Users = require('./userDb.js')
const Posts = require('../posts/postDb.js')

const router = express.Router();

router.post('/', validateUser, (req, res) => {
  // do your magic
  Users.insert(req.body)
  .then(user => {
    res.status(201).json(user)
  })
  .catch(err => {
    res.status(500).json({error: "Unable to create user"})
  })
});

router.post('/:id/posts', validatePost, validateUserId, (req, res) => {
  // do your magic!
  const id = req.params.id;
  const post = req.body.text;
  const newPost = {
    user_id: id,
    text : post
  }
  Posts.insert(newPost)
  .then(post => {
    res.status(201).json(post)
  })
  .catch(err => {
    res.status(500).json({ error: "Unable to Post"})
  })
});

router.get('/', (req, res) => {
  // do your magic!
  Users.get()
    .then(user => {
      res.status(200).json(user)
    }) 
    .catch(err => {
      res.status(500).json({ error: "Could not get users Error"})
    })

});

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  res.status(200).json(req.user)

});

router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
  Users.getUserPosts(req.params.id)
  .then(post => {
    res.status(200).json(post)
  })
  .catch(err => {
    res.status(500).json({ error: "unable to retrieve posts"})
  })
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  Users.getById(req.params.id)
  .then(user => {
    if(user){
      req.user = user;
      console.log('validated user id')
      next()   
    } else {
      res.status(400).json({ message: "invalid user id" })
    }

  })
  .catch(err => {
    res.status(500).json({ error: "Error retrieving user"})
  })

}

function validateUser(req, res, next) {
  // do your magic!
  const body = req.body;
  if(!req.body) {
    res.status(400).json({ message: "missing user data" })
  } else if (!body.name) { 
    res.status(400).json({ message: "missing required name field" })
  } else {
    console.log('req.body has a body and name')
    next()
  }
}

function validatePost(req, res, next) {
  // do your magic!
  const body = req.body;
  if(!req.body) {
    res.status(400).json({ message: "missing post data" })
  } else if (!body.text) { 
    res.status(400).json({ message: "missing required text field" })
  } else {
    console.log('req.body has a body and text')
    next()
  }
}


module.exports = router;

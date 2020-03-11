const express = require('express');
const helmet = require('helmet');

const usersRouter = require('./users/userRouter.js')
const postsRouter = require('./posts/postRouter.js')



const server = express();

//global middleware
server.use(helmet());
server.use(logger);

server.use(express.json());

server.use('/api/users', usersRouter);
server.use('/api/posts', postsRouter);


server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  const method = req.method;
  const endpoint = req.originalUrl;

  console.log(`${method} to ${endpoint}`)
  next()

}

module.exports = server;

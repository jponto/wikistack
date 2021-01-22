const express = require('express');
const userRouter = express.Router();

userRouter.get('/', (req, res) => {
  console.log('users-get');
});

module.exports = userRouter;

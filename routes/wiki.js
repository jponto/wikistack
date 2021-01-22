const express = require('express');
const wikiRouter = express.Router();
const wikiPage = require('../views/wikipage');
const { Page } = require('../models'); //implicitly imports from index
const { addPage } = require('../views'); //implicitly imports from index

//retrieve information from database
wikiRouter.get('/', (req, res) => {
  console.log('wikipage-get');
  res.send('wikipage-get');
});

//adding a new post to the wikipage
wikiRouter.post('/', async (req, res) => {
  //res.json(req.body);
  // STUDENT ASSIGNMENT:
  // add definitions for `title` and `content`
  //slug is title without spaces and special characters
  let title = req.body.title;
  let content = req.body.content;
  try {
    const page = await Page.create({
      title: title,
      content: content,
    });
    // make sure we only redirect *after* our save is complete! Don't forget to `await` the previous step. `create` returns a Promise.
    res.redirect('/');
  } catch (error) {
    next(error);
  }
});

wikiRouter.get('/add', (req, res) => {
  res.send(addPage());
  //return the add page eventually
  //code here
});

module.exports = wikiRouter;

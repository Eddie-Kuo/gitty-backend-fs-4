const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');
const { Posts } = require('../models/Posts');

module.exports = Router()
  .get('/', authenticate, async (req, res, next) => {
    try {
      const posts = await Posts.getALL();
      res.json(posts);
    } catch (e) {
      next(e);
    }
  })
  .post('/', [authenticate, authorize], async (req, res, next) => {
    try {
      const post = await Posts.post(req.body);
      res.json(post);
    } catch (e) {
      next(e);
    }
  });

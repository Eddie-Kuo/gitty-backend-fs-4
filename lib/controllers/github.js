const { Router } = require('express');
const { exchangeCodeForToken } = require('../services/github');

module.exports = Router()
  .get('/login', (req, res) => {
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.GH_CLIENT_ID}&scope=user&redirect_uri=${process.env.GH_REDIRECT_URI}`
    );
  })
  .get('/callback', async (req, res, next) => {
    try {
      //Get the code from url search params
      const { code } = req.query;
      //exchange the code for a token
      const token = await exchangeCodeForToken(code);
      // use the token to get info about the user from github
      const { email, login, avatar } = await getGithubProfile(token);
      //create a new user with that info in our database
      // set the cookies and redirect
    } catch (e) {
      next(e);
    }
  });

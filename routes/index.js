const express = require('express')
const router  = express.Router()
const Post = 
  require('../models/Post')
const { ensureLoggedIn } = require("connect-ensure-login")

router.get('/', (req, res, next) => {
  Post.find()
  .then(posts => {
    res.render('index', { user: req.user, title: 'IronFace', posts })
  })
  .catch(err => {
    console.log(err)
  })
})

router.get ( '/aboutus', (res) =>{
  res.render('aboutus')
})

module.exports = router
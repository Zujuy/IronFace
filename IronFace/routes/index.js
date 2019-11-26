const express = require('express')
const router  = express.Router()
const Post = require('../models/Post')

router.get('/', (req, res, next) => {
  Post.find()
  .then(posts => {
    res.render('index', { title: 'IronFace', posts })
  })
  .catch(err => {
    console.log(err)
  })
})

module.exports = router
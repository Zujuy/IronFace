const express = require('express')
const router = express.Router()
const Event = require('../models/Event')
const { ensureLoggedIn } = require("connect-ensure-login")
const uploadCloud = require('../config/cloudinary')

router.get('/createEvent', ensureLoggedIn("/login"), (req, res)=>{
  res.render("event/create", {
    user: req.user
  })
})

router.post('/createEvent', ensureLoggedIn('/login'),  uploadCloud.single("photo"), (req, res) => {
  const author = req.user.username
  const picPath = req.file.url
  Event.create({...req.body, picPath, author})
  .then(event => {
    res.redirect(`/event/${event._id}`)
  })
  .catch(err => console.log(err))
})

router.get('/:id', ensureLoggedIn('/login'), (req, res) => {
  Event.findById(req.params.id)
  .then(post => res.render('event/eventDetail', post))
  .catch(err => console.log(err))
})

router.post('/:id', (req, res) => {
  const { id } = req.params
  const { username } = req.user
   const {content}= req.body
  Event.findByIdAndUpdate(id , {$push: {comments:{content, author: username}}})
  .then(event => res.redirect(`/event/${id}`))
  .catch(err=> console.log(err))
})

module.exports = router
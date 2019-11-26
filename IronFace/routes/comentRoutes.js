const express = require('express')
const router = express.Router()
const Comment = require('../models/Comment')
const { ensureLoggedIn } = require("connect-ensure-login")
const uploadCloud = require('../config/cloudinary')



router.get('/comment/:id',ensureLoggedIn("/login"),(req,res,next)=>{
 res.render('comment',{action})
})

router.post('/comment/:id',uploadCloud.single('photo'),(req,res,next)=>{
  const {id} = req.params
  const comment = new Comment({
      content: req.body.content,
      imagePath: `/pics/${req.file.filename}`,
      imageName: req.file.originalname,
      authorId: req.user._id
    });

  Comment.create(comment)
  .then(comment=>{
      Post.findByIdAndUpdate(id,{$push:{commentId:comment._id}})
      .then(post=>{
          res.redirect(`/detail/${post._id}`)
        }).catch(e=>next(e))
        
      }).catch(error=>{
        console.log(error)
      })
  

})
router.get('/detail/:id',(req,res,next)=>{
  const {id} = req.params
  Post.findById(id).populate('commentId')
.then(post=>{
  res.render('detail',post)
}).catch(e=>next(e))

})
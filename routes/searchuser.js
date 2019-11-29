const User = require("../models/User");


router.post("/", (req, res) => {
    res.render("auth/vistasperfiles")
  })
  
  router.post("/vistasperfils", (req, res) => {
    const { search } = req.body
    User.find({username: { $regex: `${search}.*`, $options: 'i' } })
      .then(places => {
        console.log(places)
        res.render("auth/vistasperfiles", {user})
      })
      .catch(err => console.log(err))
  })
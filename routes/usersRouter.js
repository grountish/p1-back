const express = require('express');
const router = express.Router();
const uploadCloud = require('../config/cloudinary2');
const createError = require('http-errors')
const Song = require('../models/song');
const User = require('../models/user');


router.use((req, res, next) => {
  if (req.session.currentUser) {
    next();
    return;
  }
  res.redirect('/auth/login');
});


router.get('/', function (req, res, next) {
  User.findById(req.session.currentUser._id)
    .populate('songs scenes')
      .then(user => {
        res
        .status(201)
        .json(user)
    })
    .catch(error => console.log(error));
});

router.post('/', async (req, res, next) =>{
  console.log(req.body)
  let {username, email, aboutMe, imgPath} = req.body
  let role = "admin"
  let user = req.session.currentUser._id
  try{
 const user2 = await User.findByIdAndUpdate(user, {$set: {username, email, aboutMe, imgPath, role}}, {new: true})
 req.session.currentUser = user2
 res
 .status(200)
 .json(user2)
  } catch(err) {
      next(createError(err))
  }
})



//ADDS URL TO CLOUDINARY
router.post('/file', uploadCloud.single('imgPath'), async (req, res, next) => {
  if (!req.file) {
      next(new Error('No file uploaded!'));
      return;
  } console.log(req.file.data);
  
  //   // get secure_url from the file object and save it in the 
  //   // variable 'secure_url', but this can be any name, just make sure you remember to use the same in frontend
  //   res.json({ secure_url: req.file.secure_url });
  try{
      res
      .status(200)
      .json({
          imgPath: req.file.secure_url
      })
  } catch(err) {
      next(createError(err))
  }
})



module.exports = router;
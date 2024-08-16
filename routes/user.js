var express = require('express');
var router = express.Router();
const User = require('../modules/UserModule');
const product = require('../modules/ProductModule');
const passport = require('passport');
const localStratagey = require('passport-local')
const {isLoggedIn} = require('../middlewares/authenticateUser')
passport.use(new localStratagey(User.authenticate()));

// Render the registration page
router.get('/', function(req, res) {
  res.render('register');
});

router.get("/login",function(req,res){
  res.render('login',({error:req.flash('error')}))
})


router.get('/profile', isLoggedIn,function(req, res) {
  res.send("hello from profile");
});






// Handle user registration (✅working fine)
router.post('/register', async function(req, res, next) {
const {username,fullname,email} = req.body;
const userData = new User ({username,email,fullname});

await User.register(userData,req.body.password)
.then(function(){
  passport.authenticate('local')(req,res,function(){
    res.redirect('/profile')
  })
})
});

// login user ((✅working fine))
router.post('/login',passport.authenticate('local',{
  successRedirect:'/profile',
  failureRedirect:'/login',
  failureFlash:true
}),(req,res)=>{})


// logout user (✅working fine)
router.get('/logout',(req,res)=>{
  req.logout((err)=>{
    if(err){
      return next(err);
    }
    res.redirect('/')
  })
})




module.exports = router;

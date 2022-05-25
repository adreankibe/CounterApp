// LIBRARY
const passport = require('passport');

const loginPost = passport.authenticate('User',{
    successRedirect:'/account',
    failureRedirect:'/',
    failureFlash:true,
    session:true
})

module.exports = {
    loginPost:loginPost
}
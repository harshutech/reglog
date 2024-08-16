const passport = require('passport');

// Middleware function to check if the user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.send('you are not authentcate');
}

module.exports = { isLoggedIn };


//✅ auth middleware is working fine and its complete
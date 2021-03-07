module.exports = {
    ensureAuthenticated: function (req, res, next) {console.log(req.isAuthenticated());
        if (req.isAuthenticated()) {
            return next();
        }
    //    req.send('error_msg', 'Please log in to view that resource');
        res.redirect('/');
    },
    forwardAuthenticated: function (req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        }
        res.redirect('/dashboard');
    }
};
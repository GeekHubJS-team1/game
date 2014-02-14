var db = require('./db');

module.exports = function (app) {
    app.post('/login', function (req, res, next) {
        var login = req.body.username;
        var pass = req.body.password;
        if (!login || !pass) {
            return res.send('Send login and password');
        }
        db.users.find({login: login}, function (err, user) {
            if (!user) {
                db.users.insert({
                    login: login,
                    pass: pass
                }, function (err) {
                    if (err) return next(err);
                    req.session.user = login;
                    res.send('ok');
                });
            } else if (user.pass !== pass) {
                res.send('Wrong password');
            } else {
                req.session.user = user.login;
                res.send('ok');
            }
        });
    });
    app.get('/logout', function (req, res) {
        req.session.destroy();
        res.redirect('/');
    });
}

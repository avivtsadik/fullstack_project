const passport = require('passport');

module.exports = (app) => {
    app.get(
        '/auth/google',
        passport.authenticate('google', {
        scope: ['profile', 'email']
    })
    );

app.get('/auth/google/callback', passport.authenticate('google'));

app.get('/api/logout', (req, res) => {
    console.log("logout");
    req.logout();
    console.log("logout");
    res.send(req.user);
    console.log("logout");
});

app.get('/api/current_user', (req, res) => {
    res.send(req.user);
});
};
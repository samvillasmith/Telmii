const passport = require('passport');

module.exports = (app) => {
    app.get('/auth/google', 
    passport.authenticate('google', {
    scope: ['profile', 'email'] 
    })
);

    app.get(
        '/auth/google/callback', 
        passport.authenticate('google'),
            (req, res)=>{
                res.redirect('/surveys');
        }
    );
    
    app.get('/api/logout', (req, res)=>{
        req.logout();
        res.redirect('/');
    });

    app.post('/api/logout', (req, res) => {
        req.logout();
        res.clearCookie('connect.sid');
        res.redirect('/');
    });
      

    app.post('/api/agree', (req, res)=>{
        if(req.user) {
            req.user.agreed = true;
            req.user.save();
            res.status(200).send("Agreed");
        }else{
            res.status(401).send("Not authenticated");
        }
    });

    

    app.get('/api/current_user', (req, res)=>{
        res.send(req.user);
    });
};

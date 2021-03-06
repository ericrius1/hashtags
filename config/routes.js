var passport = require('passport'),
    invite = require('../controllers/inviteController.js'),
    user = require('../controllers/userController.js'),
    game = require('../controllers/gameController.js'),
    random = require('../controllers/randomGameController.js');

module.exports = function (app) {

  app.get('/users', user.findAll);
  app.get('/users/:id', user.findById);
  app.get('/users/search/:username', user.findByUsername);
  app.get('/users/searching/:partial', user.findByRegex);

  app.get('/games/:id', game.findById);
  app.patch('/games/:id', game.updateById);
  app.put('/games/:id', game.roundChange);

  app.post('/invite/create', invite.create);
  app.post('/invites/accept', invite.accept);
  app.post('/invites/decline', invite.decline);
  app.post('/invites/removeDeclinedGame', invite.removeDeclinedGame);

  app.get('/random/:id',  random.join);

  app.get('/auth/instagram',
    passport.authenticate('instagram'),
    function(req, res){
      // function will not be called.
    }
  );

  app.get('/auth/instagram/callback',
    passport.authenticate('instagram', { failureRedirect: '/#error' }),
    function(req, res) {
      console.log(req.user._id);
      res.redirect('/#lobby/'+req.user._id);
    }
  );

  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });
};

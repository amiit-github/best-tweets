// var express = require('express');
// var app = express();

// passport = require("passport");
// LocalStrategy = require('passport-local').Strategy;
// FacebookStrategy = require('passport-facebook').Strategy;

// app.use(express.cookieParser());
// app.use(express.bodyParser());
// app.use(express.session({ secret: 'SECRET' }));
// app.use(passport.initialize());
// app.use(passport.session());

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  response.send('Hello World!');
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});



// passport.use(new FacebookStrategy({
//     clientID: '1046246885402027',
//     clientSecret: 'f3c7864287a70588c81fc8adc560d7b0',
//     callbackURL: "http://popular-guy.herokuapp.com/auth/facebook/callback",
//     enableProof: false
//   },
//   function(accessToken, refreshToken, profile, done) {
//     User.findOrCreate({ facebookId: profile.id }, function (err, user) {
//       return done(err, user);
//     });
//   }
// ));

// app.get('/auth/facebook',
//   passport.authenticate('facebook'));

// app.get('/auth/facebook/callback',
//   passport.authenticate('facebook', { failureRedirect: '/login' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/');
//   });

// app.get('/auth/facebook',
//   passport.authenticate('facebook', { scope: ['user_status', 'user_checkins'] }));

// app.get('/auth/facebook',
//   passport.authenticate('facebook', { display: 'touch' }));

// app.get('/auth/facebook',
//   passport.authenticate('facebook', { display: 'touch' }));

// app.get('/logout', function(req, res){
//   req.logout();
//   res.redirect('/');
// });
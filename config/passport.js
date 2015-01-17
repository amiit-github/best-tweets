var mongoose = require('mongoose')
  , TwitterStrategy = require('passport-twitter').Strategy
  , User = mongoose.model('User');


module.exports = function (passport, config) {

	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		User.findOne({ _id: id }, function (err, user) {
			done(err, user);
		});
	});




    passport.use(new TwitterStrategy({
		 consumerKey: config.twitter.consumerKey,
 consumerSecret: config.twitter.consumerSecret,
 callbackURL: config.twitter.callbackURL
    },
    function(accessToken, refreshToken, profile, done) {
    	profile.authOrigin = 'twitter';
    	User.findOrCreateOAuthUser(profile, function (err, user) {
	      return done(err, user);
	    });
    }));


}

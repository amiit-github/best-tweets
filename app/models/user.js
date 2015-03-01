var mongoose = require('mongoose');

UserSchema = mongoose.Schema({
	accesstoken: String,
	tokensecret: String,
	twitter: {
		id: String,
		name: String,
		username: String
	},
	followers: [Number],
	following: [Number]
});


// UserSchema.statics.signup = function(email, password, done){
// 	var User = this;
// 	hash(password, function(err, salt, hash){
// 		if(err) throw err;
// 		// if (err) return done(err);
// 		User.create({
// 			email : email,
// 			salt : salt,
// 			hash : hash
// 		}, function(err, user){
// 			if(err) throw err;
// 			// if (err) return done(err);
// 			done(null, user);
// 		});
// 	});
// }


// UserSchema.statics.isValidUserPassword = function(email, password, done) {
// 	this.findOne({email : email}, function(err, user){
// 		// if(err) throw err;
// 		if(err) return done(err);
// 		if(!user) return done(null, false, { message : 'Incorrect email.' });
// 		hash(password, user.salt, function(err, hash){
// 			if(err) return done(err);
// 			if(hash == user.hash) return done(null, user);
// 			done(null, false, {
// 				message : 'Incorrect password'
// 			});
// 		});
// 	});
// };

// Create a new user given a profile
UserSchema.statics.findOrCreateOAuthUser = function(profile, done) {
	var User = this;

	// Build dynamic key query
	var query = {};
	query[profile.authOrigin + '.id'] = profile.id;
	// Search for a profile from the given auth origin
	User.findOne(query, function(err, user) {
		if (err) throw err;
		if (user)  {
			//user exists
					// Preexistent info, update
					user['' + profile.authOrigin].username = profile.username
					user['' + profile.authOrigin].name = profile.displayName;
					user['accesstoken'] = profile.accessToken;
					user['tokensecret'] = profile.tokenSecret;

					user.save(function(err, user) {
						if (err) throw err;
						done(null, user);
					});
		}
		else {
								//create user
					user = {};
					user['' + profile.authOrigin] = {};
					user['' + profile.authOrigin].id = profile.id;
					user['' + profile.authOrigin].username = profile.username;
					user['' + profile.authOrigin].name = profile.displayName;
					user['accesstoken'] = profile.accessToken;
					user['tokensecret'] = profile.tokenSecret;
					User.create(
						user,
						function(err, user) {
							if (err) throw err;
							done(null, user);
						}
					);
		}
	});
}

UserSchema.statics.saveMyFollowers = function(twitterid, followers, done) {
	var User = this;

	// Build dynamic key query
	var query = {};
	query['twitter.id'] = twitterid;
	// Search for a profile from the given auth origin
	User.findOne(query, function(err, user) {
		if (err) throw error;

		user['followers'] = followers;

		user.save(function(err, user) {
			if (err) throw err;
			done(null, user);
		});

	});
}

UserSchema.statics.saveMyFollowing = function(twitterid, following, done) {
	var User = this;

	// Build dynamic key query
	var query = {};
	query['twitter.id'] = twitterid;
	// Search for a profile from the given auth origin
	User.findOne(query, function(err, user) {
		if (err) throw error;

		user['following'] = following;
		user.save(function(err, user) {
			if (err) throw err;
			else done(null, user);
		});

	});
}

UserSchema.statics.getData = function(options, done) {
	var User = this;
	var query = {};
	var request_field = options.request;
	if(options.hasOwnProperty("twitterid"))
		query['twitter.id'] = options.twitterid;
	User.findOne(query, function(err, user) {
		if (err) throw error;
		else done(null, user[request_field]);
	});
}

var User = mongoose.model("User", UserSchema);
module.exports = User;

var require_absolute = require('rekuire');
var mongoose = require('mongoose')
	, User = mongoose.model('User');
var passport = require('passport');
var Auth = require_absolute('config/middlewares/authorization.js');
var mytwitterapi = require_absolute('app/controllers/api.js')

// module.exports = function (passport, config) {
// }

exports.index = function(req, res) {
		if (req.isAuthenticated()) {
			res.render("home", {
				user: req.user.twitter
			});
		} else {
			res.render("home", {
				user: null
			});
		}
	}

exports.login = function(req, res, next) {
		res.render("login");
	}

exports.profile = function(req, res, next) {
		res.render("profile", {
			user: req.user.twitter
		});
}

exports.logout = function(req, res, next) {
		req.logout();
		res.redirect('/login');
	}

exports.getfollowers = function(req, res){



	var handle = function(err, data, response) {
		if(err) {
			if(err.statusCode !== null)
				res.redirect('/login');
			else res.send(err, 500);
			return;
		}
		var jsonObj = JSON.parse(data);
		var users = jsonObj.users;
		var result = [], followers=[];
		for(i in users){
			result.push(users[i].name + ": " + users[i].description);
			followers.push(users[i].id);
		}
		User.saveMyFollowers(req.session.twitterid, followers, function(error, user) {
			if(error !== null) console.log(error);
			else res.send(result);
		});
	}
	mytwitterapi.followers(req, handle);
}

exports.getfollowing = function(req, res){

	var handle = function(err, data, response) {
		if(err) {
			if(err.statusCode !== null)
				res.redirect('/login');
			else res.send(err, 500);
			return;
		}
		var jsonObj = JSON.parse(data);
		var users = jsonObj.users;
		var result = [], following=[];
		for(i in users){
			result.push(users[i].name + ": " + users[i].description);
			following.push(users[i].id);
		}

		User.saveMyFollowing(req.session.twitterid, following, function(error, user) {
			if(error !== null) console.log(error);
			else res.send(result);
		});

	}
	mytwitterapi.following(req, handle);
}



exports.getmytweets = function(req,res, next){
		//res.send(req.session.accesstokensecret);
	// search tweets.
		passport._strategies.twitter._oauth.getProtectedResource(
				'https://api.twitter.com/1.1/statuses/user_timeline.json',
				'GET',
		req.session.accesstoken,
		req.session.accesstokensecret,
		function (err, data, response) {
				if(err) {
					if(err.statusCode !== null)
					res.redirect('/login');
					else res.send(err, 500);
					return;
				}

				var jsonObj = JSON.parse(data);
				var result = [];
				for(i in jsonObj){
						result.push(jsonObj[i].user.name + ": " + jsonObj[i].text);
				}
				res.send(result);

		});
}

exports.getmytimeline = function(req,res, next){
		passport._strategies.twitter._oauth.getProtectedResource(
				'https://api.twitter.com/1.1/statuses/home_timeline.json',
				'GET',
		req.session.accesstoken,
		req.session.accesstokensecret,
		function (err, data, response) {
				if(err) {
					if(err.statusCode !== null)
					res.redirect('/login');
					else res.send(err, 500);
					return;
				}

				var jsonObj = JSON.parse(data);
				var result = [];
				for(i in jsonObj){
						result.push(jsonObj[i].user.name + ": " + jsonObj[i].text);
				}
				res.send(result);

		});
}

exports.getwhoblockedme = function(req, res, next) {
	var my_twitter_id = req.session.twitterid;
	var blockers = [];
	User.getData({"twitterid":my_twitter_id, "request":"following"},
	function(error, following) {
		if(error) console.log(error);
		following.forEach(function(friend_id) {
			var isPresent = function(err, data, response) {
				if(err) console.log(err);
				else {

					var jsonObj = JSON.parse(data);
					var users = jsonObj.users;
					var friends_followers=[];
					for(i in users){
						following.push(users[i].id);
					}

					console.log(friends_followers);
					var i = friends_followers.indexOf(my_twitter_id);
					if(i !== -1) blockers.push(friend_id);
				}
			}
			mytwitterapi.followers(req, isPresent, friend_id);
			return;
		});
		var blocked_accounts = blockers.toString() || "Nobody";
		res.send(blocked_accounts + " has blocked you");
	});

}

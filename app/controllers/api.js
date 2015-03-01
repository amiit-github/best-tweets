var require_absolute = require('rekuire');
var passport = require('passport');
var Auth = require_absolute('config/middlewares/authorization.js');
var twitter_endpoint = require_absolute('config/api_urls.js').twitter;

exports.followers = function(req, callback, id){
	var options = "?";
	if(id !== null) {
		options += "user_id="+id;
	}
	else options = '';
	passport._strategies.twitter._oauth.getProtectedResource(
		twitter_endpoint.followersURL + options,
		'GET',
		req.session.accesstoken,
		req.session.accesstokensecret,
		function (err, data, response) {
			callback(err, data, response);
		}
	);
}

exports.following = function(req, callback, id){
	var options = "?";
	if(id !== null) {
		options += "user_id="+id;
	}
	else options = '';
	passport._strategies.twitter._oauth.getProtectedResource(
		twitter_endpoint.followingURL + options,
		'GET',
		req.session.accesstoken,
		req.session.accesstokensecret,
		function (err, data, response) {
			callback(err, data, response);
		}
	);
}

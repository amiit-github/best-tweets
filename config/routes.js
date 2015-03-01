
var Auth = require('./middlewares/authorization.js');
var controller = require('../app/controllers/user.js');

module.exports = function(app, passport) {
	app.get("/", controller.index);

	app.get("/login", controller.login);

	app.get("/auth/twitter", passport.authenticate("twitter"));

	app.get("/auth/twitter/callback",
	passport.authenticate("twitter", {
		failureRedirect: '/login'
	}),
	function(req, res) {
		console.log("authentication success");
		//save token into session

		req.session.accesstoken = req.user.accesstoken
		req.session.accesstokensecret = req.user.tokensecret;
		req.session.twitterid = req.user.twitter.id;
		
		res.render("profile", {user : req.user.twitter});
	}
);


app.get("/profile", Auth.isAuthenticated, controller.profile);
app.get('/logout', controller.logout);
app.get('/timeline', controller.getmytimeline);
app.get('/mytweets', controller.getmytweets);
app.get('/following', controller.getfollowing);
app.get('/followers', controller.getfollowers);
app.get('/blockedme', controller.getwhoblockedme);
//app.get('/blockedbyme', controller.getblockedbyme);
}

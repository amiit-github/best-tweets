module.exports = {
	development: {
		db: 'mongodb://root:root@ds029811.mongolab.com:29811/aggrtweets-mongo',
		app: {
			name: 'Passport Authentication Tutorial'
		},

		twitter: {
			consumerKey: "0SVQQRHVOwA9az7l2s4vnY7oC",
			consumerSecret: "M9elr69SsrD6WoAIc3yIYGw6n9iUrUIAWspWM4Q6rnWmruRg4b",
			//callbackURL: "http://127.0.0.1:3000/auth/twitter/callback",
			callbackURL: "http://aggr-tweets.herokuapp.com/auth/twitter/callback"
		}
	},
  	production: {
    	db: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL,
		app: {
			name: 'Passport Authentication Tutorial'
		},

		twitter: {
			consumerKey: "",
			consumerSecret: "",
			callbackURL: ""
		}

 	}
}

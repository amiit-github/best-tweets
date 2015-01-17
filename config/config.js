module.exports = {
	development: {
		db: 'mongodb://root:root@ds029811.mongolab.com:29811/aggrtweets-mongo',
		app: {
			name: 'Passport Authentication Tutorial'
		},
		facebook: {
			clientID: "1046246885402027",
			clientSecret: "f3c7864287a70588c81fc8adc560d7b0",
			callbackURL: "http://popular-guy.herokuapp.com/auth/facebook/callback"
			//callbackURL: "http://localhost:5000/auth/facebook/callback"
		},

		google: {
			clientID: "{{PLACEHOLDER}}",
			clientSecret: "{{PLACEHOLDER}}",
			callbackURL: "{{PLACEHOLDER}}"
		},

		twitter: {
			consumerKey: "0SVQQRHVOwA9az7l2s4vnY7oC",
			consumerSecret: "M9elr69SsrD6WoAIc3yIYGw6n9iUrUIAWspWM4Q6rnWmruRg4b",
			callbackURL: "http://127.0.0.1:3000/auth/twitter/callback",
			//callbackURL: "http://aggrtweets.herokuapp.com/auth/twitter/callback"
		}
	},
  	production: {
    	db: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL,
		app: {
			name: 'Passport Authentication Tutorial'
		},
		facebook: {
			clientID: "",
			clientSecret: "",
			callbackURL: ""
		},
		google: {
			clientID: '',
			clientSecret: '',
			callbackURL: ''
		}
 	}
}

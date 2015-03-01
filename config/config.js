module.exports = {
	development: {
		db: 'mongodb://localhost/bestoftweets',
		app: {
			name: 'Best of Tweets'
		},

		twitter: {
			consumerKey: "S2xIT3X1Krf0eZq2d1YDlZi0z",
			consumerSecret: "jcahInp6ueF8tMPBgSeZ0sR5KK09d8nPJ26984BdkI9DaUZkNq",
			callbackURL: "http://127.0.0.1:3000/auth/twitter/callback"
			//callbackURL: "http://bestoftweets.herokuapp.com/auth/twitter/callback"
		}
	},
  	production: {
    	db: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL,
		app: {
			name: 'Best of Tweets'
		},

		twitter: {
			consumerKey: "1Vifq0tOWi1iZj5fcGFVMlaru",
			consumerSecret: "3yaJ1zPFQjulU2Myv6faqLEVfBKIuZW0b6iC6ax7KOmcQXxFDD",
			callbackURL: "http://bestoftweets.herokuapp.com/auth/twitter/callback"
		}

 	}
}

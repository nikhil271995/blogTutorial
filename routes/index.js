var express = require('express');
var router = express.Router();

var Auth = require("./auth")
var bCrypt = require('bcrypt-nodejs');

var mongoose = require('mongoose');
var users = mongoose.model('users');
var posts = mongoose.model('posts');

/* GET home page. */
router.get('/', Auth.ensureAuthentication, function(req, res, next) {
  res.status(200).send("Success");
});

router.get("/show", function(req, res, next){
	posts.find({}, {"title":1, "content":1, "time" :1}, function(err, data){
		if(err)
			res.status(500).send(err);
		res.send(data)
	})
})

module.exports = router;

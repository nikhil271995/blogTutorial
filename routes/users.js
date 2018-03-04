var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

var bCrypt = require('bcrypt-nodejs');
var Auth = require("./auth")

var users = mongoose.model('users');
var posts = mongoose.model('posts');

router.post("/register", function(req, res, next){
	var user = new users({
		name : req.body.name,
		email : req.body.email,
		password : createHash(req.body.password)
	})
	user.save(function(err, data){
		if(err)
			res.status(400).send(err)
		else
			res.send("Success. Your account has been created Successfully. Please Log in to continue")
	});
});

router.post("/login", function(req, res, next){
	users.findOne({"email" : req.body.username}, function(err, data){
		console.log(data);
		if(data!= null && data){
			if(err)
				res.status(500).send(err)
			else if(!data || !isValidPassword(data, req.body.password))
				res.status(400).send("Invalid Email/Password combination");
			else
				res.send({"key":data._id.toString()})
		}
		else
			res.status(400).send("Invalid Email/Password combination");
	})
});

router.post("/write", Auth.ensureAuthentication, function(req, res, next){
	var post = new posts({
		title : req.body.title,
		content : req.body.content,
		user : req.headers.authorization.split(" ")[1]
	})
	post.save(function(err, data){
		if(err)
			res.status(500).send(err)
		else
			res.send({"message" : "Your blog has been created"});
	})
});


router.get("/show", Auth.ensureAuthentication, function(req, res, next){
	posts.find({"user" : req.headers.authorization.split(" ")[1]}, {"title":1, "content":1, "time" :1}, function(err, data){
		if(err)
			res.status(500).send(err);
		res.send(data)
	});
});

router.put("/update", Auth.ensureAuthentication, function(req, res, next){
	posts.remove({"user" : req.headers.authorization.split(" ")[1], "_id": req.query.id}, {
		$set : {
			title : req.body.title,
			content : req.body.title,
		}
	} ,function(err, data){
		if(err)
			res.status(500).send(err)
		console.log("")
		res.send("Your post has been delete Successfully")
	});
});

router.delete("/delete", Auth.ensureAuthentication, function(req, res, next){
	posts.remove({"user" : req.headers.authorization.split(" ")[1], "_id": req.query.id}, function(err, data){
		if(err)
			res.status(500).send(err)
		console.log(data);
		if(data.n)
			res.send("Your post has been delete Successfully");
		else
			res.status(400).send("Invalid request. Post not found.")
	});
});



// router.put("/update", Auth.ensureAuthentication, function(req, res, next){
// 	posts.find({"_id":})
// });

var isValidPassword = function(user, password){
  return bCrypt.compareSync(password, user.password);
}

var createHash = function(password){
	return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

module.exports = router;

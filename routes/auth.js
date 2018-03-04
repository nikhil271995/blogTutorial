module.exports.ensureAuthentication = function(req, res, next){
	// var userId = req.headers.userid.split(" ")
	console.log(req.header, req.headers)
	if(!req.headers.authorization || req.headers.authorization.split(" ").length <2)
		res.status(401).send("Unauthorized")
	else next()
}
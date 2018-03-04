var mongoose = require('mongoose');
var Schema = mongoose.Schema

var Schema = mongoose.Schema;
var userSchema = new Schema({
	email :{
		type:String,
		required : true
	},
	name :{
		type:String,
		required : true
	},
	password:{
		type: String,
		required : true
	},
	time:{
		type: Date,
		default : Date.now()
	}
});
module.exports = mongoose.model('users', userSchema);


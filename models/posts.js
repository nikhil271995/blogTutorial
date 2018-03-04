var mongoose = require('mongoose');
var Schema = mongoose.Schema

var Schema = mongoose.Schema;
var postSchema = new Schema({
	title :{
		type:String,
		required : true
	},
	content :{
		type:String,
		required : true
	},
	user:{
		type: Schema.Types.ObjectId,
		required : false
	},
	time:{
		type: Date,
		default: Date.now()
	}
});
module.exports = mongoose.model('posts', postSchema);


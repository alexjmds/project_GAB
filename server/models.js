var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var shopSchema = new Schema({
	shopName: { type: String },
	address: { type: String, required: true },
	lat: { type: Number, required: true },
	lng: { type: Number, required: true}
});
 


var beerSchema = new Schema({
	companyName: { type: String, required: true },
  	name: { type: String, required: true },
	color: { type: String, required: true },
	origin: { type: String, required: true },
	style: { type: String, required: true },
	abv: { type: Number, required: true },
	description: { type: String, required: true },
	img: {type: String},
	date: { type: Date, default: Date.now },
	shops: [ shopSchema ]
});
 
mongoose.model('Beer', beerSchema);
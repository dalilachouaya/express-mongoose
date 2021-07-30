
// require mongoose
const mongoose = require('mongoose');
//Create a person with this prototype:
/*----------- Person Prototype -*/
const personSchema = new mongoose.Schema({
    name: {type: String , required: true},//name: string [required]
    age: {type:Number, default:10},//age: number
    favoriteFoods: [String],//favoriteFoods: array of strings
    phone: {type:String,unique: true} , 
});
//The .model() function makes a copy of schema
module.exports = person = mongoose.model('person', personSchema);


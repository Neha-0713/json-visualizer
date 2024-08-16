const {Schema, model} = require('../connection');


const mySchema = new Schema({
    location: String,
    area:String,

});

 module.exports = model('users', mySchema);
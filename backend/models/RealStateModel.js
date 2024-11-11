const { Schema, model } = require('../connection');


const mySchema = new Schema({
    description: String,
    location: String,
    area: String,
    image: String,
    category:String,
    price:Number,
    createdAt: { type: Date, default: Date.now }
});

module.exports = model('realstate', mySchema);
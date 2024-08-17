const { Schema, model } = require('../connection');


const mySchema = new Schema({
    location: String,
    area: String,
    image: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = model('realstate', mySchema);
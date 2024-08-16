const mongoose = require('mongoose');

const url = "mongodb+srv://neha:Neha200402@cluster0.70lw4rp.mongodb.net/realstatewebapp?retryWrites=true&w=majority&appName=Cluster0"


//asynchronous function- they return promise object and then catch is used to to check if there is any error
mongoose.connect(url)
.then((result) => {
    console.log('database connected');
})
.catch((err) => {
    console.log(err);
});

module.exports = mongoose;
const mongoose = require('mongoose');
//const User = require('./models/user');

mongoose.connect('mongodb://127.0.0.1:27017/chartbtc');
const db = mongoose.connection;
console.log('MongoDB connected')
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


/*const user = new User({
    _id: new mongoose.Types.ObjectId(),
    login:'alex',
    password: 'ededede'
})*/

//user.save()


//module.exports = db
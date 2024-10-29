const mongoose = require('mongoose');

const btcShema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    pricerate: {
        type: Array,
    },
    diffrate: {
        type: Array  
    },
    hashrate: {
        type: Array   
    },

});

const btc = mongoose.model('BTC', btcShema);

module.exports = btc;

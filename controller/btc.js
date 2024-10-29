const exchangeService = require('../services/btc');

async function getBtcCharts(req, res) {
    try {
        const chart = await exchangeService.getBTC();
        res.status(200);
        res.json(chart)   
    } catch(err) {
        console.error(err);
        res.status(401).json(err);
    }
}

module.exports = {
    getBtcCharts
};
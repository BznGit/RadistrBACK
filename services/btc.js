//const api = require('../api/api');
//const { apiAskingIntervalHours } = require('../config')
//const mongoose = require('mongoose');
//const BTC = require('../db/schemas/btc');

//checkOrDefineBTC();


function updateDataBTCfromApi(){
    try { 
        async function apiAsking(){
            const rate = await api.getExchange();
            const data = await api.getGeneralBtc();

            await BTC.updateOne({}, 
                {
                    $push: {
                        pricerate: {
                            x: new Date().setHours(0,0,0,0),
                            y: rate? parseFloat(rate.last24_price) : 0
                        },          
                        diffrate: {
                            x: new Date().setHours(0,0,0,0), 
                            y: data? data.bitcoin.blockDifficulty : 0,  
                        },
                        hashrate: {
                            x: new Date().setHours(0,0,0,0), 
                            y: data? parseFloat(data.bitcoin.networkHashRateLong) : 0 
                        }
                    }
                }
            )
        }
        apiAsking()
        setInterval(apiAsking, apiAskingIntervalHours*3600)
    } catch(err) {
        return Promise.reject('user not found');
    }
}

function getBTC() {
    try { 
      const data = BTC.findOne({})
      return data
    } catch(err) {
        return Promise.reject('chart not found');
    }
}

async function checkOrDefineBTC(){
    const data = await getHashrateHistoryBtc();
    const dataOld = await BTC.findOne({});
    if(dataOld){
         await BTC.updateOne({}, 
            {
                $set:{
                    pricerate: data.arrPrice,
                    diffrate: data.arrDifficulty,
                    hashrate: data.arrHashrate
                } 
            }
        )
    } else {
        const btc = new BTC({
            _id: new mongoose.Types.ObjectId(),
            pricerate: data.arrPrice,
            diffrate: data.arrDifficulty,
            hashrate: data.arrHashrate
        })
        btc.save()
    }  
} 

async function getHashrateHistoryBtc(){
    const btclast = await api.getDiffBtcDaily(11111111111);
    //console.log(btclast)
    let height = btclast.stopHeight;
    let entries = btclast.entries;
    let j = 0;
    let arrHashrate =[];
    let arrDifficulty = [];

    while(entries.length){
        let btc = await api.getDiffBtcDaily(height);
        height = btc.stopHeight    
        entries = btc.entries;
        if(entries.length){
            for(let i = 0; i < entries.length; i++){  
                j++;   
                let ts =  new Date(entries[i].sliceTime * 1000).setHours(0,0,0,0); 
                arrHashrate.push({
                    x: ts,
                    y: parseFloat(entries[i].hashRate)
                })  
            };
        }
    }
    arrHashrate = arrHashrate.reverse()

    let start = Math.trunc(arrHashrate[0].x / 1000)
    let arrPrice = await getPriceHistoryBtc(start)

    for(let i = 1; i < arrPrice.length; i++){
        if(arrPrice[i].x > arrHashrate[i].x )arrHashrate[i].x = arrPrice[i].x;
        if(arrPrice[i].x > arrHashrate[i].x && arrHashrate[i].x == arrHashrate[i - 1].x) arrHashrate.splice(i, 1)
    }
    arrHashrate.splice(arrHashrate.length - 5, 5)

    arrHashrate.forEach(item=>{

        arrDifficulty.push({
            x: item.x,
            y: (item.y*86400)/144*Math.pow(2,-32)
        })
    })      
//
    return {arrHashrate, arrPrice, arrDifficulty}
}
async function getPriceHistoryBtc(start){

    const rate = await api.getExchangeList();
    if(!rate) return 
    let index = findClosestNumber(rate, start)
    let arr = [];
    for(let i = index; i < rate.length; i++){ 
       
        arr.push({
            x: rate[i].time * 1000,
            y: rate[i].close
        })
    };
    return arr
}

function findClosestNumber(arr, target) {
    if(arr.length == 0) return 0
    let closest = arr[0];
    let minDifference = Math.abs(target - arr[0].time);
   
    for (let i = 1; i < arr.length; i++) {
       let difference = Math.abs(target - arr[i].time);
       if (difference < minDifference) {
         minDifference = difference;
         closest = arr[i];
       }
    }
    const index = arr.indexOf(closest)
    return index
}


module.exports = {
   // updateDataBTCfromApi,
   // getBTC
};
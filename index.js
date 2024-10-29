require('dotenv').config();
const express = require("express");
const router = require("./routes");
const bodyParser = require('body-parser');
const session = require("./middleware/session");
const corsMw = require("./middleware/cors");
//const mgb = require('./db/mongo')
const config = require("./config");
const app = express();


//const  btcService = require("./services/btc");
//btcService.updateDataBTCfromApi()


// if you run behind a proxy (e.g. nginx)
// app.set('trust proxy', 1);

//setup CORS logic
//app.options("*", corsMw);
//app.use(corsMw);

app.use(express.json({ limit: '10mb' }))
app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
//app.use(session);
app.use(router);

app.use(express.static('./dist')); 

app.listen(process.env.PORT, () => console.log(`The server runs on port ${process.env.PORT}`));

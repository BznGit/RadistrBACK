require('dotenv').config();
const express = require("express");
const router = require("./routes");
const bodyParser = require('body-parser');
const app = express();

app.use(express.json({ limit: '10mb' }))
app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(router);
app.use(express.static('./dist')); 

app.listen(process.env.PORT, () => console.log(`The server runs on port ${process.env.PORT}`));

const cors = require("cors");

let host = null;
if(process.env.NODE_ENV === 'development') host = 'localhost'; else host = process.env.HOST;

const whitelist = new Set(["https://example1.com", "https://example2.com", `http://136.243.156.190:${process.env.PORT}`, `http://localhost:${process.env.PORT}`]);

const corsOptions = {
  optionsSuccessStatus: 200,

  origin: function(origin, callback) {
    if (origin === undefined) origin = `http://${host}:${process.env.PORT}`
    if (whitelist.has(origin)) {  
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
  
};

module.exports = cors(corsOptions);

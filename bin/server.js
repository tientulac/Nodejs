const app = require('../app');
const setupPort = require('../commons/setupPort');
const api = require('../apis/index');
const handleError = require('../commons/handleErrors');
//--------------------------------------------------------CONNECT MONGO---------------------------------------------------
const connectMongoose = require('../WebConfig');
const cron = require('../cron');
const client = require('../elasticsearch/connection');

connectMongoose.connectDB();
// cron.start();


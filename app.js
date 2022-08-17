'use strict';
//Mã hóa môi trường ENV
require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
//swagger list API
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Hanttech-API',
            description: 'VN-connect ***PORTAL: Staging New',
            contact: {
                name: "Nodejs Developer"
            },
            servers: [process.env.SERVER_SWAGGER]
        }
    },
    apis: ['./Swaggers/*/*.js']
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);


const checkPath = require('./middlewares/checkPath');

// Passport middleware
const passport = require("passport");
require("./middlewares/passport")(passport);
app.use(passport.initialize());
app.use((req, res, next) => {
    if (checkPath.isNotAuthPath(req.path), (next) => {
        return next();
    })
    passport.authenticate('jwt')(req, res, () => {
      if (checkPath.isUnauthorized(req)) {
        return res.status(401).end();
      }
      next();
    });
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');
// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//Put your angular dist folder here
app.use(express.static(path.join(__dirname, 'dist')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});


//--------------------------------------------------------CORS---------------------------------------------------
app.use(cors());
app.use(cors({origin: 'http://localhost:51744/'}));
app.use(function(req, res, next) {
    console.log("enable cor successfully !!");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


module.exports = app;



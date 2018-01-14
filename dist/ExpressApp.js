"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserRouter_1 = require("./routes/common/account/UserRouter");
const AppRouter_1 = require("./routes/common/AppRouter");
const passport_1 = require("./config/passport");
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const config = require("config");
const helmet = require("helmet");
const mongoose = require("mongoose");
// Creates and configures an ExpressJS web server.
class ExpressApp {
    //Run configuration methods on the Express instance.
    constructor() {
        this.cfg = config.get('jwtConfig');
        this.dbProperties = config.get('dbProperties');
        this.corsOpts = {
            origin: '*',
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            allowedHeaders: ['Authorization', 'Content-Type', 'Access-Control-Allow-Origin']
        };
        this.express = express();
        this.setEnvironment();
        this.database();
        this.middleware();
        this.routes();
    }
    /**
      * database connection
      */
    database() {
        if (this.dbProperties.isMongoDb) {
            let MONGODB_URI = this.dbProperties.mongodbURL;
            mongoose.connect(MONGODB_URI);
            mongoose.connection.on('error', () => {
                console.log('MongoDB connection error. Please make sure MongoDB is running.');
                process.exit();
            });
        }
        else {
            /*
             * Mongoose by default sets the auto_reconnect option to true.
             * We recommend setting socket options at both the server and replica set level.
             * We recommend a 30 second connection timeout because it allows for
             * plenty of time in most operating environments.
             */
            var options = {
                server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
                replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }
            };
            var mongodbUri = this.dbProperties.mongolabURL;
            mongoose.connect(mongodbUri, options);
            var conn = mongoose.connection;
            conn.on('error', console.error.bind(console, 'connection error:'));
            conn.once('open', function () {
                // Wait for the database connection to establish, then start the app.        
                console.log('MongoLAB Connected!');
            });
        }
    }
    // Configure Express middleware.
    middleware() {
        //morgan is used for logs
        this.express.use(logger('dev'));
        //security middleware that handles several kinds of attacks
        this.express.use(helmet());
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.json({ limit: '2mb' }));
        this.express.use(bodyParser.urlencoded({ limit: '2mb', extended: false }));
        this.express.use(cookieParser());
        //used to serve data for any kind of client-side applications
        this.express.use(cors(this.corsOpts));
        //to make requests lighter and load faster
        //this.express.use(compression);
        //initialize JWT authentication
        this.express.use(passport_1.default.initialize());
        // this.express.use(passport.session());
        // const pConfig = new PassportConfig(passport);
        // pConfig.init();
    }
    setEnvironment() {
        if (this.express.get('env') === 'development') {
            this.express.use((req, res, next) => {
                next();
            });
            this.express.use((error, req, res, next) => {
                res.status(error['status'] || 500);
                res.json({
                    message: error.message,
                    error
                });
            });
        }
        else {
            this.express.use((error, req, res, next) => {
                res.status(error['status'] || 500);
                res.json({
                    isSuccessful: false,
                    message: error.message,
                    error: {}
                });
                return null;
            });
        }
    }
    // Configure API endpoints.
    routes() {
        let isAuthEnabled = this.cfg.isAuthEnabled;
        let authenticate = passport_1.default.authenticate('jwt', this.cfg.jwtSession);
        if (isAuthEnabled) {
            // this.express.use('/api/users', authenticate, new UserRouter().router);
        }
        else {
            this.express.use('/api/users', new UserRouter_1.UserRouter().router);
        }
        this.express.use('/', new AppRouter_1.AppRouter().router);
        this.express.use('/api', new AppRouter_1.AppRouter().router);
    }
}
exports.default = new ExpressApp().express;

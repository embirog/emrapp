import { UserRouter } from './routes/common/account/UserRouter';
// import { EmployeesRouter } from './common/EmployeesRouter';
// import { TablesRouter } from './common/TablesRouter';
// import { ProfileRouter } from './common/account/ProfileRouter';
// import { AccessRouter } from './common/account/AccessRouter';
import { AppRouter } from './routes/common/AppRouter';
// import { PassportConfig } from './config/passport';
import passportcfg from './config/passport';

import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as cookieParser from "cookie-parser";
import * as cors from 'cors';
import * as config from 'config';
import * as helmet from 'helmet';
import * as mongoose from 'mongoose';
import * as passport from 'passport';
// var mongoose = require('mongoose');

// Creates and configures an ExpressJS web server.
class ExpressApp {

  // ref to Express instance
  public express: express.Application;
  public cfg = config.get('jwtConfig');
  public dbProperties = config.get('dbProperties');

  //Run configuration methods on the Express instance.
  constructor() {
    this.express = express();
    this.setEnvironment();
    this.database();
    this.middleware();

    this.routes();
  }

  private corsOpts = {
    origin: '*', //only requests from this origin will be allowed 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], //methods allowed
    allowedHeaders: ['Authorization', 'Content-Type', 'Access-Control-Allow-Origin']
  };

  /**
    * database connection
    */
  private database(): void {

    if(this.dbProperties.isMongoDb){
      let MONGODB_URI = this.dbProperties.mongodbURL;

      mongoose.connect(MONGODB_URI);
      mongoose.connection.on('error', () => {
        console.log('MongoDB connection error. Please make sure MongoDB is running.');
        process.exit();
      });
    } else {
      //mongodb://<dbuser>:<dbpassword>@ds161823.mlab.com:61823/emrappdb
      

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
  
      var mongodbUri = 'mongodb://emruser:password@ds161823.mlab.com:61823/emrappdb';
  
      mongoose.connect(mongodbUri, options);
      var conn = mongoose.connection;
  
      conn.on('error', console.error.bind(console, 'connection error:'));
  
      conn.once('open', function () {
        // Wait for the database connection to establish, then start the app.        
        console.log('Wait for the database connection to establish, then start the app.                         ')                 
      });
    }
  }

  // Configure Express middleware.
  private middleware(): void {
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
    this.express.use(passportcfg.initialize());
    // this.express.use(passport.session());
    // const pConfig = new PassportConfig(passport);
    // pConfig.init();
  }

  private setEnvironment(): void {
    if (this.express.get('env') === 'development') {
      this.express.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
        next();
      });

      this.express.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
        res.status(error['status'] || 500);
        res.json({
          message: error.message,
          error
        });
      });
    } else {
      this.express.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction): any => {
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
  private routes(): void {

    let isAuthEnabled: boolean = this.cfg.isAuthEnabled;
    let authenticate = passportcfg.authenticate('jwt', this.cfg.jwtSession);
    if (isAuthEnabled) {
      // let authenticate = passportcfg.authenticate('jwt', this.cfg.jwtSession);
      // this.express.use('/api/employees', authenticate, new EmployeesRouter().router);
      // this.express.use('/api/queries', authenticate, new TablesRouter().router);
      // this.express.use('/api/profiles', new ProfileRouter().router);
      // this.express.use('/api/users', authenticate, new UserRouter().router);
      // this.express.use('/api/access', authenticate, new AccessRouter().router);
    } else {
      // this.express.use('/api/employees', new EmployeesRouter().router);
      // this.express.use('/api/queries', new TablesRouter().router);
      // this.express.use('/api/profiles', new ProfileRouter().router);
      this.express.use('/api/users', new UserRouter().router);
      // this.express.use('/api/access', new AccessRouter().router);
    }
    this.express.use('/', new AppRouter().router);
    this.express.use('/api', new AppRouter().router);
    // this.express.use('/api/register', new UserRouter().router);

  }
}

export default new ExpressApp().express;

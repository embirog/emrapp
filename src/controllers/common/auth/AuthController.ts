import { Constants } from './../../../services/common/Constants';
import { UserService } from './../../../services/common/account/UserService';
import { Request, Response, NextFunction } from 'express';
import { ErrorController } from '../ErrorController';

import * as jwt from 'jsonwebtoken';
import * as config from 'config';
import * as ms from 'ms';
let cfg = config.get('jwtConfig');
import * as bcrypt from 'bcryptjs';

let userService = new UserService();
let errorController = new ErrorController();
let constants = new Constants();

let httpVal = constants.HttpReturnValues;
let response: any;

const AuthController = {

    async loginUser(req: Request, res: Response) {
        try {
            const JWT = 'JWT';
            let email: string = req.body.email;
            let password: string = req.body.password;
            let payload = await AuthController.authenticateUser(email, password);
            let token = jwt.sign(payload, cfg.jwtSecret, { expiresIn: cfg.expiresIn });
            return res.status(200).json({
                token: JWT + token,
            });
        } catch (error) {
            response = await errorController.processError(error);
            return res.status(httpVal.UNAUTHORIZED).json(response);
        }
    },

    async authenticateUser(email: string, password: string) {
        let userDetails = await userService.getUserByEmail(email, null);
        let payload = {};
        if (userDetails.payload == null) {
            throw new Error("Authorization failed. Cannot find user!");
        } else {
            let ret = bcrypt.compareSync(password, userDetails.payload.password);
            if(!bcrypt.compareSync(password, userDetails.payload.password)){
                throw new Error("Authorization failed. User credentials are invalid!");
            } else {
                payload["userName"] = userDetails.payload.userName; 
                payload["userType"] = userDetails.payload.userType; 
                return payload;
            }
        }
    },

    async logoutUser(req: Request, res: Response) {
        // try {
        //     if(req && req.headers){
        //         console.log("before: ", req.headers.authorization);
        //         req.headers.authorization = null;                
        //         console.log("after: ", req.headers.authorization);
        //     }
        // } catch (error) {
        //     response = errorController.processError(error);
        //     return res.status(httpVal.UNAUTHORIZED).json(response);
        // }
    },
}

export default AuthController
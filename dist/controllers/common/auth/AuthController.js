"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Constants_1 = require("./../../../services/common/Constants");
const UserService_1 = require("./../../../services/common/account/UserService");
const ErrorController_1 = require("../ErrorController");
const jwt = require("jsonwebtoken");
const config = require("config");
let cfg = config.get('jwtConfig');
const bcrypt = require("bcryptjs");
let userService = new UserService_1.UserService();
let errorController = new ErrorController_1.ErrorController();
let constants = new Constants_1.Constants();
let httpVal = constants.HttpReturnValues;
let response;
const AuthController = {
    loginUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const JWT = 'JWT';
                let email = req.body.email;
                let password = req.body.password;
                let payload = yield AuthController.authenticateUser(email, password);
                let token = jwt.sign(payload, cfg.jwtSecret, { expiresIn: cfg.expiresIn });
                return res.status(200).json({
                    token: JWT + token,
                });
            }
            catch (error) {
                response = yield errorController.processError(error);
                return res.status(httpVal.UNAUTHORIZED).json(response);
            }
        });
    },
    authenticateUser(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            let userDetails = yield userService.getUserByEmail(email, null);
            let payload = {};
            if (userDetails.payload == null) {
                throw new Error("Authorization failed. Cannot find user!");
            }
            else {
                let ret = bcrypt.compareSync(password, userDetails.payload.password);
                if (!bcrypt.compareSync(password, userDetails.payload.password)) {
                    throw new Error("Authorization failed. User credentials are invalid!");
                }
                else {
                    payload["userName"] = userDetails.payload.userName;
                    payload["userType"] = userDetails.payload.userType;
                    return payload;
                }
            }
        });
    },
    logoutUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    },
};
exports.default = AuthController;

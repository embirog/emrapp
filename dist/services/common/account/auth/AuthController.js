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
const ResponseController_1 = require("./../ResponseController");
const Constants_1 = require("./../../../services/common/Constants");
const QueriesController_1 = require("./../QueriesController");
const UserService_1 = require("./../../../services/common/account/UserService");
const EmployeesService_1 = require("../../../services/common/EmployeesService");
const ErrorController_1 = require("../ErrorController");
const jwt = require("jsonwebtoken");
const config = require("config");
let cfg = config.get('jwtConfig');
let employeesService = new EmployeesService_1.default();
let userService = new UserService_1.UserService();
let queriesController = new QueriesController_1.QueriesController();
let errorController = new ErrorController_1.ErrorController();
let responseController = new ResponseController_1.ResponseController();
let constants = new Constants_1.Constants();
let httpVal = constants.HttpReturnValues;
let response;
const AuthController = {
    loginUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const JWT = 'JWT ';
                let username = req.body.username;
                let password = req.body.password;
                let payload = yield AuthController.authenticateUser(username, password);
                let token = jwt.sign(payload, cfg.jwtSecret, { expiresIn: cfg.expiresIn });
                return res.status(200).json({
                    token: JWT + token,
                });
            }
            catch (error) {
                response = errorController.processError(error);
                return res.status(httpVal.UNAUTHORIZED).json(response);
            }
        });
    },
    authenticateUser(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            let userDetails = yield userService.getUser(username, null);
            let payload = {};
            if (userDetails) {
                let isAdmin = false;
                for (let userProfiles of userDetails.userHasProfiles) {
                    if (userProfiles.profile_code === constants.PROFILECODE_ADMIN) {
                        isAdmin = true;
                        break;
                    }
                }
                if (password === userDetails.password) {
                    payload["id"] = userDetails.username;
                    payload["isAdmin"] = isAdmin;
                    return payload;
                }
                else {
                    throw new Error("Authorization failed. User credentials are invalid!");
                }
            }
            else {
                throw new Error("Authorization failed. Cannot find user!");
            }
        });
    },
    logoutUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req && req.headers) {
                    console.log("before: ", req.headers.authorization);
                    req.headers.authorization = null;
                    console.log("after: ", req.headers.authorization);
                }
            }
            catch (error) {
                response = errorController.processError(error);
                return res.status(httpVal.UNAUTHORIZED).json(response);
            }
        });
    },
};
exports.default = AuthController;

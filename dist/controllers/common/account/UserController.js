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
const ErrorController_1 = require("./../ErrorController");
let userService = new UserService_1.UserService();
let errorController = new ErrorController_1.ErrorController();
let httpVal = new Constants_1.Constants().HttpReturnValues;
let response;
const UserController = {
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var token = UserController.getToken(req.headers);
            try {
                let cols = req.query.cols;
                let sortby = req.query.sortby;
                response = yield userService.getUsers(cols, sortby);
                return res.status(httpVal.GET_PUT_PATCH_DELETE_OK).json(response);
            }
            catch (error) {
                response = errorController.processError(error);
                return res.status(httpVal.SERVER_ERROR).json(response);
            }
        });
    },
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let cols = req.query.cols;
                let id = req.params.id;
                response = yield userService.getUser(id, cols);
                return res.status(httpVal.GET_PUT_PATCH_DELETE_OK).json(response);
            }
            catch (error) {
                response = errorController.processError(error);
                return res.status(httpVal.SERVER_ERROR).json(response);
            }
        });
    },
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let data = req.body;
                response = yield userService.createUser(data);
                return res.status(httpVal.POST_CREATED).json(response);
            }
            catch (error) {
                response = errorController.processError(error);
                return res.status(httpVal.SERVER_ERROR).json(response);
            }
        });
    },
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let data = req.body;
                let id = req.params.id;
                response = yield userService.updateUser(id, data);
                return res.status(httpVal.GET_PUT_PATCH_DELETE_OK).json(response);
            }
            catch (error) {
                response = errorController.processError(error);
                return res.status(httpVal.SERVER_ERROR).json(response);
            }
        });
    },
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = req.params.id;
                response = yield userService.deleteUser(id);
                return res.status(httpVal.GET_PUT_PATCH_DELETE_OK).json(response);
            }
            catch (error) {
                return res.status(httpVal.SERVER_ERROR).json(response);
            }
        });
    },
    getToken(headers) {
        return __awaiter(this, void 0, void 0, function* () {
            if (headers && headers.authorization) {
                var parted = headers.authorization.split(' ');
                if (parted.length === 2) {
                    return parted[1];
                }
                else {
                    return null;
                }
            }
            else {
                return null;
            }
        });
    }
};
exports.default = UserController;

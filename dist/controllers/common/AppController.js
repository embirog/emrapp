"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorController_1 = require("./ErrorController");
const Constants_1 = require("./../../services/common/Constants");
let response;
let constants = new Constants_1.Constants();
let errorController = new ErrorController_1.ErrorController();
const AppController = {
    getAllLinks(req, res) {
        try {
            let baseUrl = constants.BASE_URL;
            let response = {};
            return res.status(200).json(response);
        }
        catch (error) {
            response = errorController.processError(error);
            return res.status(500).json(response);
        }
    }
};
exports.default = AppController;

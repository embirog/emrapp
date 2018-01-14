"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Constants_1 = require("../../services/common/Constants");
let constants = new Constants_1.Constants();
class ErrorController {
    constructor() { }
    processError(error) {
        const response = { code: constants.FAILED_CODE, message: constants.FAILED_DESC };
        let message = error.message || error;
        response.message = message;
        return response;
    }
}
exports.ErrorController = ErrorController;

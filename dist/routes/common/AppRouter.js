"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class AppRouter {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    init() {
        // this.router.get('/', AppController.getAllLinks);
        // this.router.post('/login', AuthController.loginUser);
    }
}
exports.AppRouter = AppRouter;
const appRoutes = new AppRouter();
exports.default = appRoutes.router;

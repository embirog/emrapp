"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("../../../controllers/common/account/UserController");
class UserRouter {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    init() {
        this.router.get('/', UserController_1.default.getUsers);
        this.router.get('/:id', UserController_1.default.getUser);
        this.router.post('/', UserController_1.default.createUser);
        this.router.put('/:id', UserController_1.default.updateUser);
        this.router.delete('/:id', UserController_1.default.deleteUser);
    }
}
exports.UserRouter = UserRouter;
const userRouter = new UserRouter();
exports.default = userRouter.router;

import { Constants } from './../../../services/common/Constants';
import { UserService } from './../../../services/common/account/UserService';
import { ErrorController } from './../ErrorController';
import { Request, Response, NextFunction } from 'express';

let userService = new UserService();
let errorController = new ErrorController();

let httpVal = new Constants().HttpReturnValues;
let response: any;

const UserController = {

    async getUsers(req: Request, res: Response) {
        var token = UserController.getToken(req.headers);
        try {
            let cols: string = req.query.cols;
            let sortby: string = req.query.sortby;
            response = await userService.getUsers(cols, sortby);
            return res.status(httpVal.GET_PUT_PATCH_DELETE_OK).json(response);
        } catch (error) {
            response = errorController.processError(error);
            return res.status(httpVal.SERVER_ERROR).json(response);
        }
    },

    async getUser(req: Request, res: Response) {
        try {
            let cols: string = req.query.cols;
            let id: string = req.params.id;
            response = await userService.getUser(id, cols);
            return res.status(httpVal.GET_PUT_PATCH_DELETE_OK).json(response);
        } catch (error) {
            response = errorController.processError(error);
            return res.status(httpVal.SERVER_ERROR).json(response);
        }
    },

    async createUser(req: Request, res: Response) {
        try {
            let data = req.body;
            response = await userService.createUser(data);
            return res.status(httpVal.POST_CREATED).json(response);
        } catch (error) {
            response = errorController.processError(error);
            return res.status(httpVal.SERVER_ERROR).json(response);
        }
    },

    async updateUser(req: Request, res: Response) {
        try {
            let data = req.body;
            let id: string = req.params.id;
            response = await userService.updateUser(id, data);
            return res.status(httpVal.GET_PUT_PATCH_DELETE_OK).json(response);
        } catch (error) {
            response = errorController.processError(error);
            return res.status(httpVal.SERVER_ERROR).json(response);
        } 
    },

    async deleteUser(req: Request, res: Response){
        try {
            let id: string = req.params.id;
            response = await userService.deleteUser(id);
            return res.status(httpVal.GET_PUT_PATCH_DELETE_OK).json(response);
        } catch (error) {
            return res.status(httpVal.SERVER_ERROR).json(response);
        } 
    },

    async getToken(headers) {
        if (headers && headers.authorization) {
            var parted = headers.authorization.split(' ');
            if (parted.length === 2) {
                return parted[1];
            } else {
                return null;
            }
        } else {
            return null;
        }
    }
}

export default UserController
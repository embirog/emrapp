import { ErrorController } from './ErrorController';
import { ResponseObj } from './../../models/common/base/RespModel';
import { Constants } from './../../services/common/Constants';
import { Request, Response, NextFunction } from 'express';

let response: any;
let constants = new Constants();
let errorController = new ErrorController();

const AppController = {

  getAllLinks(req: Request, res: Response) {
    try {
        let baseUrl: String = constants.BASE_URL;
        let response: ResponseObj = {};

        return res.status(200).json(response);
    } catch (error) {
        response = errorController.processError(error);
        return res.status(500).json(response);
    }
  }
}

export default AppController
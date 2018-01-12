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
        // let routes = constants.routes;
        // let links: any = {
        //     "apihome" : baseUrl.concat(constants.routes.apihome),
        //     "employees" : baseUrl.concat(constants.routes.employees),
        //     "queries": baseUrl.concat(constants.routes.queries),
        //     "profiles" : baseUrl.concat(constants.routes.profiles),
        //     "users" : baseUrl.concat(constants.routes.users),
        //     "access" : baseUrl.concat(constants.routes.access)
        // };
        // response = constants.RESPONSEOBJ_SUCCESS;
        // response.links = links;  

        return res.status(200).json(response);
    } catch (error) {
        response = errorController.processError(error);
        return res.status(500).json(response);
    }
  }
}

export default AppController
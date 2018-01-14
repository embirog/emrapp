import { Constants } from '../../services/common/Constants';
import { ResponseObj } from './../../models/common/base/RespModel';

let constants = new Constants();

export class ErrorController {

  constructor() { }

  processError(error: any) {
    const response: ResponseObj = { code: constants.FAILED_CODE, message: constants.FAILED_DESC }
    let message = error.message || error;  
    response.message = message;
    return response;
  }
}
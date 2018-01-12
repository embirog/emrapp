import { Constants } from '../../services/common/Constants';
import { ResponseObj } from './../../models/common/base/RespModel';

let constants = new Constants();

export class ErrorController {

  constructor() { }

  processError(error: any) {
    const response: ResponseObj = { code: constants.FAILED_CODE, message: constants.FAILED_DESC }
    response.message = error;
    return response;
  }
}
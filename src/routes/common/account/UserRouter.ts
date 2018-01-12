import {Router, Request, Response, NextFunction} from 'express';
import UserController from '../../../controllers/common/account/UserController';

export class UserRouter {
  router: Router

  constructor() {
    this.router = Router();
    this.init();
  }

  init() {
    this.router.get('/', UserController.getUsers);
    this.router.get('/:id', UserController.getUser);
    this.router.post('/', UserController.createUser);
    this.router.put('/:id', UserController.updateUser);
    this.router.delete('/:id', UserController.deleteUser);
  }
}

const userRouter = new UserRouter();
export default userRouter.router;

import { Router, Request, Response, NextFunction } from 'express';
import AppController from '../../controllers/common/AppController';
// import AuthController from '../../controllers/common/auth/AuthController';

export class AppRouter {
  router: Router

  constructor() {
    this.router = Router();
    this.init();
  }

  init() {
    this.router.get('/', AppController.getAllLinks);
    // this.router.post('/login', AuthController.loginUser);
  }

}

const appRoutes = new AppRouter();
export default appRoutes.router;

import { Router } from 'express';

import { usersGetMethod, usersRegister, usersLogin, usersMe } from '../controllers/usersControllers.js';

const usersRouter = Router();

usersRouter.get('/users/', usersGetMethod);

usersRouter.post('/users/register', usersRegister);

usersRouter.post('/users/login', usersLogin);

usersRouter.get('/users/me/:userId', usersMe);

export default usersRouter;


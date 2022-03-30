import { Router } from 'express';

import { usersGetMethod } from '../controllers/usersControllers.js';

const users = Router();

users.get('/users', usersGetMethod);


export default users;


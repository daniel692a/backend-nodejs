import { Router } from 'express';

import { showSales } from '../controllers/salesControllers.js';

const salesRouter = Router();

salesRouter.get('/sales', showSales);


export default salesRouter;


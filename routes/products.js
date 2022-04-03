import { Router } from 'express';

import { showProducts } from '../controllers/productsControllers.js';

const productsRouter = Router();

productsRouter.get('/products', showProducts);


export default productsRouter;


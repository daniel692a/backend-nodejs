import { Router } from 'express';
import {StatusCodes} from 'http-status-codes';

const products = Router();

products.get('/products', (req, res)=>{
	return res.status(StatusCodes.OK).json({"users": "Holas"});
});


export default products;


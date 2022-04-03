import express from "express";
import {StatusCodes} from "http-status-codes";
import morgan from "morgan";
import cors from 'cors';

import productsRouter from "../routes/products.js";
import usersRouter from "../routes/users.js";
import salesRouter from "../routes/sales.js";

let app = express();
let logger = morgan('dev');

app.use(logger);
app.use(cors());
app.use(usersRouter);
app.use(salesRouter);
app.use(productsRouter);

app.get("/", (req, res)=>{
	// req -> request
	// res -> response
	console.debug(req.headers);
	// console.debug(req.ip);
	return res.status(StatusCodes.OK).json({"message": "Welcome"});
});

app.use("*", (req, res)=>{
	return res.status(StatusCodes.NOT_FOUND).json({"message": "escribes mal"});
});

export default app;

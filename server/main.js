import express from "express";
import {StatusCodes} from "http-status-codes";
import morgan from "morgan";
import cors from 'cors';

import products from "../routes/products.js";
import users from "../routes/users.js";

let app = express();
let logger = morgan('dev');

app.use(logger);
app.use(cors());
app.use(users);
app.use(products);

app.get("/", (req, res)=>{
	// req -> request
	// res -> response
	console.debug(req.headers);
	console.debug(req.ip);
	return res.status(StatusCodes.OK).json({"message": "Welcome"});
});

app.use("*", (req, res)=>{
	return res.status(StatusCodes.BAD_REQUEST).json({"message": "escribes mal"});
});

export default app;

import express from "express";
import {StatusCodes} from "http-status-codes";
import morgan from "morgan";
import cors from 'cors';
import mongoose from 'mongoose';

import productsRouter from "../routes/products.js";
import usersRouter from "../routes/users.js";
import salesRouter from "../routes/sales.js";

import { getMongoCreds } from '../utils/config.js';


let app = express();
let logger = morgan('dev');

const { usr, pwd, host } = getMongoCreds();

//
mongoose.connect(
	`mongodb+srv://${usr}:${pwd}@${host}/myFirstDatabase?retryWrites=true&w=majority`,
	{
		useNewUrlParser: true, useUnifiedTopology: true
	}
)

app.use(logger);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ "extended": true }));


mongoose.Promise  = global.Promise;

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

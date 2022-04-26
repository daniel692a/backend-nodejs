import { StatusCodes } from "http-status-codes";
import bcrypt from 'bcrypt';
import mongoose from "mongoose";
import user from '../models/user.js';
import jwt from 'jsonwebtoken';
import fs from 'fs';

export const usersGetMethod = (req, res) => {
	const { authorization } = req.headers;
	if (!authorization) {
		return res.status(StatusCodes.BAD_REQUEST).json({"error":"header not found"});
	}
	const pubKey =  fs.readFileSync(`${process.cwd()}/keys/public.pem`, "utf8");

	try {
		const jwtData = jwt.verify(authorization, pubKey);
		const { id } = jwtData;
		user.findById(id, { "_id" : 0, "password": 0, "__v": 0 }).exec().then(usr_find=>{
			if(!usr_find){
				return res.status(StatusCodes.NOT_FOUND).json({"error":"user not found"});
			}
			return res.status(StatusCodes.OK).json(usr_find);
		}).catch(usrError=>{
			console.log(usrError);
			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({"error":"Error al obtener los datos"});
		});
	} catch (validateError) {
		console.error(validateError);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({"error":"Error al validar el token"});
	}
	return res.status(StatusCodes.OK).json({"mesaage": "Hola Users"});
}

export const usersRegister = ( req, res ) => {
	const { name, last_name="", email, password } = req.body;

	if(name === "" || email === "" || password===""){
		return res.status(StatusCodes.BAD_REQUEST).json({"error":"empty values"});
	}

	const queryParams = { email };

	user.findOne(queryParams).exec().then(async user_in_db=>{
		if(user_in_db !== null){
			console.log(user_in_db);
			return res.status(StatusCodes.BAD_REQUEST).json({"error": "Email already exists"});
		}

		const pwdHash = bcrypt.hashSync(password, 12);

		if(pwdHash===null){
			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({"error": "Ha ocurrido un error al hashear"});
		}

		const usertToInsert = {
			name,
			last_name,
			email,
			"password": pwdHash,
			"createdAt": new Date().toISOString()
		};

		const session = await user.starSession();

		user.create([usertToInsert], session);

		await session.commitTransaction();

	}).catch(error=>{
		console.error(error);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({"error": "error in db"});
	});


	return res.status(StatusCodes.CREATED).json({"mesaage": "User created"});
}

export const usersLogin = ( req, res ) => {
	const { email, password } = req.body;
	user.findOne({ email }, { "__v": 0 }).exec().then(user_found=>{
		if(user_found===null){
			return res.status(StatusCodes.BAD_REQUEST).json({"eror": "Las credenciales son incorrectas"});
		}
		const { _id, name } = user_found;
		const pwdHsh = user_found["password"];

		if(!bcrypt.compareSync(password, pwdHsh)){
			return res.status(StatusCodes.BAD_REQUEST).json({"error": "credenciales incorrectas"});
		}
		const token_payload = {
			name,
			email,
			"id": _id
		};
		const pKey = fs.readFileSync(`${process.cwd()}/keys/private.key`, "utf8");
		const token = jwt.sign(token_payload, pKey, {
			"algorithm": "RS256",
			"expiresIn": "6h"
		});

		if (!token){
			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({"error":"Error al generar el token"});
		}
		return res.status(StatusCodes.OK).json({"message":"Login succesful", token});
	}).catch(usrError=>{
		console.error(usrError);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({"error": "Error al solicitar los datos en la BD"});
	});
}

export const usersMe = (req, res) => {
	return res.status(StatusCodes.OK).json({"mesaage":"user"});
}

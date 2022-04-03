import { StatusCodes } from "http-status-codes";

export const usersGetMethod = (req, res) => {
	return res.status(StatusCodes.OK).json({"mesaage": "Hola Users"});
}

export const usersRegister = ( req, res ) => {
	return res.status(StatusCodes.CREATED).json({"mesaage": "User created"});
}

export const usersLogin = ( req, res ) => {
	return res.status(StatusCodes.OK).json({"mesaage": "Login exitoso"});
}

export const usersMe = (req, res) => {
	return res.status(StatusCodes.OK).json({"mesaage":"user"});
}

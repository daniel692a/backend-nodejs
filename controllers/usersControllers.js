import { StatusCodes } from "http-status-codes";

export const usersGetMethod = (req, res) => {
	return res.status(StatusCodes.OK).json({"mesaage": "Hola Users"});
}


import { StatusCodes } from "http-status-codes";

export const showProducts = (req, res) => {
	return res.status(StatusCodes.OK).json({"mesaage": "lista de productos"});
}


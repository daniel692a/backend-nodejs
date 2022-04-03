import { StatusCodes } from "http-status-codes";

export const showSales = ( req, res ) => {
	return res.status(StatusCodes.ACCEPTED).json({"mesaage":"lista de ventas"});
}

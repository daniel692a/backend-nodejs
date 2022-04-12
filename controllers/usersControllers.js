import { StatusCodes } from "http-status-codes";
import bcrypt from 'bcrypt';

export const usersGetMethod = (req, res) => {
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
	return res.status(StatusCodes.OK).json({"mesaage": "Login exitoso"});
}

export const usersMe = (req, res) => {
	return res.status(StatusCodes.OK).json({"mesaage":"user"});
}

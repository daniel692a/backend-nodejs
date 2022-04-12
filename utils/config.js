import ConfigParser from 'configparser';

const cfg = new ConfigParser();

function getMongoCreds(){
	cfg.read(`${process.cwd()}/config.cfg`);
	if(cfg.get("MONGO", "host") && cfg.get("MONGO", "user") && cfg.get("MONGO", "password")){
		const usr = cfg.get("MONGO", "user");
		const pwd = cfg.get("MONGO", "password");
		const host = cfg.get("MONGO", "host");
		//mongodb+srv://${usr}:${pwd}@${host}/myFirstDatabase?retryWrites=true&w=majority`;
		return {usr, pwd, host};
	} else {
		console.error("Error en las secciones de configuración");
		return { usr: null, pwd: null, host: null };
	}
}

export { getMongoCreds };

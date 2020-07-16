const config = require("./server-setting");
const entities = require("./models/entities").entities;

module.exports = {
	type: "postgres",
	host: config.db.host,
	port: config.db.port,
	username: config.db.user,
	password: config.db.pass,
	database: config.db.name,
	extra: config.db.extra,
	synchronize: false,
	logging: false,
	entities,
	migrations: ["migration/*.ts"],
	cli: {
		migrationsDir: "migration"
	}
};

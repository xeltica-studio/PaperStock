import { getConnection, createConnection, Connection } from "typeorm";
import serverSetting from "@/server-setting";
import { entities } from "@/models/entities";

const { host, port, user: username, pass: password, name: database, extra } = serverSetting.db;

export function initializeDatabase (recreate = false): Promise<Connection> {
	if (!recreate) {
		try {
			return Promise.resolve(getConnection());
		} catch { /* nop */ }
	}

	return createConnection({
		type: "postgres",
		host,
		port,
		username,
		password,
		database,
		extra,
		entities
	});
}

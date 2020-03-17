import monk from "monk";
import config from "@/server-setting";

const { host, port, database } = config.mongo;

const url = `mongodb://${encodeURIComponent(host)}:${encodeURIComponent(port)}/${encodeURIComponent(database)}`;

export const db = monk(url);

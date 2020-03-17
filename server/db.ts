import { MongoClient, MongoClientOptions } from "mongodb";
import config from "@/server-setting";

const { host, port, database } = config.mongo;

const url = `mongodb://${host}:${port}/${database}`;

export const db = (option?: MongoClientOptions) => MongoClient.connect(url, option);

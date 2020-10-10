import { Connection, createConnection} from "typeorm";

export let connection: Connection;

export const initDatabase = async () => {
   console.log("디비 connect")
   connection =  await createConnection();
   return connection;
}
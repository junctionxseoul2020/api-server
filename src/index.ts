import {initDatabase} from "./database";
import {app} from "./app";

const start = async () => {
    await initDatabase()
    await app()
}

start()

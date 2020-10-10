import 'reflect-metadata'
import express from "express"
import {indexRouter} from "./router/indexRouter";
import {socketRouter} from "./router/socketRouter";
import {userRouter} from "./router/userRouter";
import {createServer} from 'http'
import socket from "socket.io";


export const app = async () => {
    console.log("앱 부트")
    const app = express()
    const server = createServer(app);

    app.use(express.json());
    app.use('/', new indexRouter().router);
    app.use('/user', new userRouter().router);

    const io = socket(server);
    new socketRouter(io)

    server.listen(process.env.PORT || 8080, () => {
        console.log("Server 가 실행되었습니다.")
    })
}
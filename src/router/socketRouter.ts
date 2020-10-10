import {Server} from "socket.io";

export class socketRouter {

    constructor(io: Server) {
        console.log("socketRouter 부트")

        io.on('connection', (socket) => {
            console.log('a user connected');
        });

    }
}
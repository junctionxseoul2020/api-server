import {Server} from "socket.io";

export class socketRouter {

    constructor(io: Server) {
        console.log("socketRouter 부트")

        io.on('connection', (socket) => {
            socket.on('chat message', (msg) => {
                io.emit('chat message', msg);
            });
        });

    }
}
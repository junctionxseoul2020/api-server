import {Server} from "socket.io";

export class socketRouter {

    constructor(io: Server) {
        console.log("socketRouter 부트")

        io.on('connection', (socket) => {
            socket.on('disconnect', () => {
                console.log('user disconnected');
            });

            socket.on('chat message', (room, name, msg) => {
                console.log('chat', room, name, msg)
                io.to(room).emit('chat message', name, msg);
            });

            socket.on('join room', (room, name) => {
                socket.join(room, () => {
                    console.log('join', room, name)
                    io.to(room).emit('joinRoom', name);
                });
            });

            socket.on('leaveRoom', (room, name) => {
                socket.leave(room, () => {
                    console.log('leave', room, name);
                    io.to(room).emit('leaveRoom', room, name);
                });
            });
        });
    }
}
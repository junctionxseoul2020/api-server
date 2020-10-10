import {Server} from "socket.io";
import {connection} from "../database";
import {Channel} from "../entity/Channel";
import {User} from "../entity/User";

export class socketRouter {
    private channelRepository = connection.getRepository(Channel);
    private userRepository = connection.getRepository(User);

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

            socket.on('join room', (room, userId) => {
                socket.join(room, async () => {
                    const user = await this.userRepository.findOne({id: userId})
                    const channel = await this.channelRepository.findOne({id: room})
                    if (!user || !channel) {
                        return;
                    }
                    channel.participants.push(user)
                    await this.channelRepository.save(channel);
                    console.log('join', room, user.name)
                    io.to(room).emit('joinRoom', user.name);
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
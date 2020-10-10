import {Server} from "socket.io";
import {connection} from "../database";
import {Channel} from "../entity/Channel";
import {User} from "../entity/User";
import {Chat} from "../entity/Chat";

export class socketRouter {
    private channelRepository = connection.getRepository(Channel);
    private userRepository = connection.getRepository(User);
    private chatRepository = connection.getRepository(Chat);

    constructor(io: Server) {
        console.log("socketRouter 부트")

        io.on('connection', (socket) => {
            console.log('user connected');

            socket.on('disconnect', () => {
                console.log('user disconnected');
            });

            socket.on('chatMessage', async (room, userId, msg) => {
                const user = await this.userRepository.findOne({id: userId})
                const channel = await this.channelRepository.findOne({id: room});
                if (!user || !channel) {
                    console.log("no user or channel")
                    return;
                }
                const chat = new Chat();
                chat.text = msg;
                chat.author = user;
                chat.channel = channel;
                const savedChat = await this.chatRepository.save(chat);
                console.log('chat', room, user.name, savedChat);
                io.to(room).emit('chatMessage', user.name, JSON.stringify(savedChat));
            });

            socket.on('joinRoom', (room, userId) => {
                socket.join(room, async () => {
                    const user = await this.userRepository.findOne({id: userId})
                    const channel = await this.channelRepository.findOne({id: room}, {
                        relations: ['participants']
                    })
                    if (!user || !channel) {
                        console.log('no user or channel')
                        return;
                    }
                    channel.participants.push(user)
                    await this.channelRepository.save(channel);
                    const chats = await this.chatRepository.find({relations: ['author'], order: {createdAt: "ASC"}})
                    console.log('join', room, user.name, chats)
                    socket.emit('hello')
                    io.to(socket.id).emit('joinRoom', user.name, JSON.stringify(chats));
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
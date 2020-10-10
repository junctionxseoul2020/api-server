import {Router} from "express";
import {connection} from "../database";
import {Channel} from "../entity/Channel";
import {Workspace} from "../entity/Workspace";
import {User} from "../entity/User";

export class channelRouter {
    public router = Router();
    private channelRepository = connection.getRepository(Channel);
    private workspaceRepository = connection.getRepository(Workspace);
    private userRepository = connection.getRepository(User);

    constructor() {
        console.log("channelRouter 부트")

        this.router.post('/my', async (req, res) => {
            const user = await this.userRepository.findOne({id: req.body.userId}, {relations: ['channels']});
            console.log(user);
            if (!user) {
                return res.json('no user')
            }
            return res.json(user.channels);
        })
        this.router.post('/list', async (req, res) => {
            const workspace = await this.workspaceRepository.findOne({id: req.body.workspaceId});
            if (!workspace) {
                return res.json('no workspace')
            }
            const channels = await this.channelRepository.find({
                workspace,
                isDM: false,
                isConference: false,
                isPrivate: false
            });
            return res.json(channels);
        })

        this.router.post('/info', async (req, res) => {
            const channel = await this.channelRepository.findOne({id: req.body.id}, {relations: ['participants']});
            if (!channel) {
                return res.json('no channel')
            }
            return res.json(channel);
        })

        this.router.post('/lounge', async (req, res) => {
            const channel = await this.channelRepository.findOne({name: '라운지'}, {relations: ['participants']});
            if (!channel) {
                return res.json('no channel')
            }
            return res.json(channel);
        })

        this.router.post('/create', async (req, res) => {
            const user = await this.userRepository.findOne({id: req.body.userId});
            const users = await this.userRepository.findByIds(req.body.userIds);
            const workspace = await this.workspaceRepository.findOne({id: req.body.workspaceId});
            if (!workspace || !user || users.length <= 0) {
                return res.json('no workspace or user')
            }
            const channel = new Channel();
            channel.workspace = workspace;
            channel.name = req.body.name;
            channel.description = req.body.description;
            channel.participants = users;
            channel.isDM = req.body.isDM;
            const savedChannel = await this.channelRepository.save(channel);
            return res.json(savedChannel);
        });

        this.router.post('/invite', async (req, res) => {
            const users = await this.userRepository.findByIds(req.body.userIds);
            const channel = await this.channelRepository.findOne({id: req.body.channelId}, {relations: ['participants']});
            if (!channel || users.length <= 0) {
                return res.json('no workspace or users')
            }
            channel.participants = [...channel.participants, ...users];
            const savedChannel = await this.channelRepository.save(channel);
            return res.json(savedChannel);
        });

    }
}
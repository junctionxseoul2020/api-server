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

        this.router.post('/list', async (req, res) => {
            const workspace = await this.workspaceRepository.findOne({id: req.body.workspaceId});
            if (!workspace) {
                return res.json('no workspace')
            }
            const channels = await this.channelRepository.find({workspace});
            return res.json(channels);
        })

        this.router.post('/create', async (req, res) => {
            const user = await this.userRepository.findOne({id: req.body.userId});
            const workspace = await this.workspaceRepository.findOne({id: req.body.workspaceId});
            if (!workspace || !user) {
                return res.json('no workspace or user')
            }
            const channel = new Channel();
            channel.workspace = workspace;
            channel.name = req.body.name;
            channel.participants = [user];
            const savedChannel = await this.channelRepository.save(channel);
            return res.json(savedChannel);
        });

    }
}
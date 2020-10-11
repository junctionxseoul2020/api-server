import {Router} from "express";
import {connection} from "../database";
import {Conference} from "../entity/Conference";
import {User} from "../entity/User";
import {Workspace} from "../entity/Workspace";
import {Channel} from "../entity/Channel";

export class conferenceRouter {
    public router = Router();
    private conferenceRepository = connection.getRepository(Conference);
    private userRepository = connection.getRepository(User);
    private workspaceRepository = connection.getRepository(Workspace);
    private channelRepository = connection.getRepository(Channel);

    constructor() {
        console.log("conferenceRouter 부트")

        this.router.post('/my', async (req, res) => {
            const user = await this.userRepository.findOne({id: req.body.userId}, {relations: ['conferences']});
            if (!user) {
                return res.json('no user')
            }
            return res.json(user.conferences)
        })

        this.router.post('/create', async (req, res) => {
            const users = await this.userRepository.findByIds(req.body.userIds);
            const workspace = await this.workspaceRepository.findOne({id: req.body.workspaceId});
            if (users.length <= 0 || !workspace) {
                return res.json('no users or workspace');
            }
            const channel = new Channel();
            channel.participants = users;
            channel.workspace = workspace;
            channel.description = req.body.description;
            channel.name = req.body.name;
            channel.isConference = true;
            channel.isInstantMessage = req.body.isInstanceMessage;
            const savedChannel = await this.channelRepository.save(channel);
            const conference = new Conference();
            conference.description = req.body.description;
            conference.name = req.body.name;
            conference.participants = users;
            conference.releasedAt = req.body.releasedAt;
            conference.workspace = workspace;
            conference.channel = savedChannel
            const savedConference = await this.conferenceRepository.save(conference);
            return res.json(savedConference);
        })

        this.router.post('/info', async (req, res) => {
            const conference = await this.conferenceRepository.findOne({id: req.body.id}, {relations: ['participants', 'channel']});
            console.log(conference)
            if (!conference) {
                return res.json('no conference')
            }
            return res.json(conference);
        })
    }
}
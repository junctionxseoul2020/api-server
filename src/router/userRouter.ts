import {Router} from "express";
import {User} from "../entity/User";
import {connection} from "../database";
import {Workspace} from "../entity/Workspace";

export class userRouter {
    public router = Router();
    private userRepository = connection.getRepository(User);
    private workspaceRepository = connection.getRepository(Workspace);

    constructor() {
        console.log("indexRouter 부트")

        this.router.post('/login', async (req, res) => {
            const user = await this.userRepository.findOne({email: req.body.email})
            if (!user) {
                return res.json('not found user')
            }
            if (user.password === req.body.password) {
                user.status = 'LoggedIn'
                await this.userRepository.save(user);
                return res.json(user)
            }
            return res.json('login error')
        });

        this.router.post('/logout', async (req, res) => {
            const user = await this.userRepository.findOne({id: req.body.id})
            if (!user) {
                return res.json('not found user')
            }
            user.status = 'LoggedOut'
            const loggedOutUser = await this.userRepository.save(user)
            return res.json(loggedOutUser)
        });

        this.router.post('/register', async (req, res) => {
            const workspace = await this.workspaceRepository.findOne({id: req.body.workspaceId})
            if (!workspace) {
                return res.json('workspace error')
            }
            const user = new User().toUser(req.body.name, req.body.email, req.body.password, 'Registered', req.body.hashcode, workspace)
            await this.userRepository.save(user)
            return res.json(user)
        });
    }
}
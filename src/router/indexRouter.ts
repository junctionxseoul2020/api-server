import {Router} from "express";
import {User} from "../entity/User";
import {connection} from "../database";

export class indexRouter {
    router = Router();
    userRepository = connection.getRepository(User);

    constructor() {
        console.log("indexRouter 부트")

        this.router.get('/', async (req, res) => {
            const user = await this.userRepository.findOne()
            res.send(user)
        });
    }
    }
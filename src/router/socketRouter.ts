import {Router} from "express";

export const socketRouter = Router();

socketRouter.get('/', (req, res) => {
    res.send('World!')
});


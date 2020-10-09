import express from "express"
import {indexRouter} from "./router/indexRouter";
import {socketRouter} from "./router/socketRouter";

export const app = async () => {
    const app = express()

    app.use('/',indexRouter);
    app.use('/socket',socketRouter);

    app.listen(3000, () => {
        console.log("Server가 실행되었습니다.")
    })
}
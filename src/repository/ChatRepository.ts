import {EntityRepository, Repository} from "typeorm";
import {Chat} from "../entity/Chat";

@EntityRepository()
export class ChatRepository extends Repository<Chat> {
}
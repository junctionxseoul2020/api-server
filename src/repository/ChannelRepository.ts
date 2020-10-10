import {EntityRepository, Repository} from "typeorm";
import {Channel} from "../entity/Channel";

@EntityRepository()
export class ChannelRepository extends Repository<Channel> {
}
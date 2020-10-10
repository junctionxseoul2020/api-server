import {EntityRepository, Repository} from "typeorm";
import {Conference} from "../entity/Conference";

@EntityRepository()
export class ConferenceRepository extends Repository<Conference> {
}
import {EntityRepository, Repository} from "typeorm";
import {User} from "../entity/User";
import {Workspace} from "../entity/Workspace";

@EntityRepository()
export class WorkspaceRepository extends Repository<Workspace> {
}
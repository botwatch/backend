import {IClient} from "./IClient";
import {IOldSchoolAccount} from "./IOldSchoolAccount";
import {IInteraction} from "./IInteraction";
import {IExperience} from "./IExperience";

export interface ISession {
    id: number;
    client: IClient;
    account: IOldSchoolAccount;
    start: Date;
    end: Date;
    actions: IInteraction[];
    experiences: IExperience[];
}

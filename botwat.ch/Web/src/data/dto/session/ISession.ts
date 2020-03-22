import {IClient} from "../client/IClient";
import {IOldSchoolAccount} from "../account/IOldSchoolAccount";
import {IInteraction} from "../interaction/IInteraction";

export interface ISession {
    id: number;
    client: IClient;
    account: IOldSchoolAccount;
    start: Date;
    end: Date;
    actions: IInteraction[];
    experiences: IInteraction[];
}

import {IClient} from "../client/IClient";
import {IOldSchoolAccount} from "../account/IOldSchoolAccount";

export interface ISession {
    id: number;
    client: IClient;
    account: IOldSchoolAccount;
    start: Date;
    end: Date;
}

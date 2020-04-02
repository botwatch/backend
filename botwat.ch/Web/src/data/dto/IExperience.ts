import {IOldSchoolAccount} from "./IOldSchoolAccount";

export interface IExperience {
    id: number;
    sessionId: number;
    owner: IOldSchoolAccount;
    occurred: Date;
    skillIndex: number;
    skillExperience: number;
} 
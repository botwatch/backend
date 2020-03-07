import {withQuery} from "with-query";
import {IUser} from "../data/dto/user/IUser";
import {authenticationService} from "./authentication.service";


export const sessionService = {
    createAccount 
};

async function createAccount(alias: string) {
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set('Authorization', `Bearer ${authenticationService.currentUserValue.token}`);
    
    let response = await fetch(withQuery('/account/create', {
        alias: alias,
    }), {
        method: 'post',
        headers: requestHeaders
    });

    if (!response.ok)
        return response.text();
    let responseUser: any = await response.json();   
    return responseUser;
}
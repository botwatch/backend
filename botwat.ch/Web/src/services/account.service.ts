import {withQuery} from "with-query";
import {authenticationService} from "./authentication.service";

export const accountService = {
    createAccount, getAccounts, createClient, getClients, createSession, getSessions
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
    return response.ok ? await response.json() : response.text();
}

async function getAccounts() {
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set('Authorization', `Bearer ${authenticationService.currentUserValue.token}`);

    let response = await fetch(withQuery('/account/all'), {
        method: 'post',
        headers: requestHeaders
    });
    return response.ok ? await response.json() : response.text();
}

async function createClient(name: string, description: string, url: string, authors: string) {
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set('Authorization', `Bearer ${authenticationService.currentUserValue.token}`);

    let response = await fetch(withQuery('/client/create', {
        name: name,
        description: description,
        url: url,
        authors: authors
    }), {
        method: 'post',
        headers: requestHeaders
    });
    return response.ok ? await response.json() : response.text();
}

async function getClients() {
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set('Authorization', `Bearer ${authenticationService.currentUserValue.token}`);

    let response = await fetch(withQuery('/client/all'), {
        method: 'post',
        headers: requestHeaders
    });
    return response.ok ? await response.json() : response.text();
}

async function createSession(client: string, alias: string) {
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set('Authorization', `Bearer ${authenticationService.currentUserValue.token}`);

    let response = await fetch(withQuery('/session/create', {
        client: client,
        alias: alias
    }), {
        method: 'post',
        headers: requestHeaders
    });
    return response.ok ? await response.json() : response.text();
}

async function getSessions() {
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set('Authorization', `Bearer ${authenticationService.currentUserValue.token}`);

    let response = await fetch(withQuery('/session/all'), {
        method: 'post',
        headers: requestHeaders
    });
    return response.ok ? await response.json() : response.text();
}

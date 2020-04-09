import {withQuery} from "with-query";
import {authenticationService} from "./authentication.service";

export const accountService = {
    createAccount, getAccounts, createClient, getClients, createSession, getSessions, getInteractions, getExperiences,
    getDashboard, getMap
};

async function getDashboard(date: Date, span: number) {
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set('Authorization', `Bearer ${authenticationService.currentUserValue.token}`);

    let response = await fetch(withQuery('/dashboard/data', {
        startDay: date,
        daySpan: span
    }), {
        method: 'post',
        headers: requestHeaders
    });
    return response.ok ? await response.json() : response.text();
}

async function getMap(date: Date, span: number) {
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set('Authorization', `Bearer ${authenticationService.currentUserValue.token}`);

    let response = await fetch(withQuery('/map/heatmap', {
        startDay: date,
        daySpan: span
    }), {
        method: 'post',
        headers: requestHeaders
    });
    return response.ok ? await response.json() : response.text();
}

async function getInteractions(ids: number[]) {
    let response = await fetch('/interaction/get', {
        method: 'post',
        body: JSON.stringify(ids),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authenticationService.currentUserValue.token}`
        },
    });
    return response.ok ? await response.json() : response.text();
}

async function getExperiences(ids: number[]) {
    let response = await fetch('/experience/get', {
        method: 'post',
        body: JSON.stringify(ids),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authenticationService.currentUserValue.token}`
        },
    });
    return response.ok ? await response.json() : response.text();
}

async function createAccount(alias: string) {
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set('Authorization', `Bearer ${authenticationService.currentUserValue.token}`);

    let response = await fetch(withQuery('/account/create', {
        alias: encodeURIComponent(alias),
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

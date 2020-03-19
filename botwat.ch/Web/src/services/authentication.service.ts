import {BehaviorSubject} from 'rxjs';
import {IUser} from "../data/dto/user/IUser";
import {withQuery} from 'with-query';

const currentUserSubject = new BehaviorSubject(JSON.parse(<string>localStorage.getItem('currentUser')));

export const authenticationService = {
    login,
    logout,
    authenticate,
    create,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue() {
        return currentUserSubject.value as IUser
    }
};

async function create(name: string, email: string, password: string) {
    let response = await fetch(withQuery('/user/create', {
        name: name,
        email: email,
        password: password,
    }), {
        method: 'post'
    });

    if (!response.ok)
        return response.text();
    let responseUser: IUser = await response.json();
    localStorage.setItem('currentUser', JSON.stringify(responseUser));
    currentUserSubject.next(responseUser);
    return responseUser;
}
async function authenticate(name: string, password: string) {
    let response = await fetch(withQuery('/user/authenticate', {
        name: name,
        password: password
    }), {
        method: 'post'
    });

    if (!response.ok)
        return response.text();
    let responseUser: IUser = await response.json();
    localStorage.setItem('currentUser', JSON.stringify(responseUser));
    currentUserSubject.next(responseUser);
    return responseUser;
}

async function login(name: string, token: string) {
    let response = await fetch(withQuery('/user/login', {
        name: name,
        token: token
    }), {
        method: 'post'
    });

    if (!response.ok)
        return response.text();
    let responseUser: IUser = await response.json();
    localStorage.setItem('currentUser', JSON.stringify(responseUser));
    currentUserSubject.next(responseUser);
    return responseUser;
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}
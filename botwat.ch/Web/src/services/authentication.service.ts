import {BehaviorSubject} from 'rxjs';
import {IUser} from "../data/IUser";

const currentUserSubject = new BehaviorSubject(JSON.parse(<string>localStorage.getItem('currentUser')));

export const authenticationService = {
    login,
    logout,
    create,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue() {
        return currentUserSubject.value as IUser
    }
};

async function create(user: IUser) {
    let response = await fetch('/user/create', {
        method: 'post',
        body: JSON.stringify(user),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });
    let responseUser: IUser = await response.json();
    localStorage.setItem('currentUser', JSON.stringify(responseUser));
    currentUserSubject.next(responseUser);
    return user;

}

async function login(user: IUser) {
    let response = await fetch('/user/authenticate', {
        method: 'post',
        body: JSON.stringify(user),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });
    let responseUser: IUser = await response.json();
    localStorage.setItem('currentUser', JSON.stringify(responseUser));
    currentUserSubject.next(responseUser);
    return user;

}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}
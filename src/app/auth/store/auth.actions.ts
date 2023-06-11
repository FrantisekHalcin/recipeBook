import {Action} from "@ngrx/store";

export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const LOGIN_START = '[Auth] Login Start'
export const LOGIN_FAIL = '[Auth] Login Fail'
export const SIGN_UP_START = '[Auth] SignUp Start'
export const CLEAR_ERROR = '[Auth] Clear Error'
export const AUTO_LOGIN = '[Auth] Auto Login'

export class Login implements Action {
    readonly type = LOGIN
    constructor(public payload: {
        email: string, id: string, token: string, expiration: Date, redirect: boolean
    }) {
    }
}

export class Logout implements Action {
    readonly type = LOGOUT
}

export class LoginStart implements Action {
    readonly type = LOGIN_START
    constructor(public payload: {email: string, password: string}) {
    }
}

export class LoginFail implements Action {
    readonly type = LOGIN_FAIL
    constructor(public payload: string) {
    }
}

export class SignUpStart implements Action {
    readonly type = SIGN_UP_START
    constructor(public payload: {email: string, password: string}) {
    }
}

export class ClearError implements Action {
    readonly type = CLEAR_ERROR
    constructor() {
    }
}

export class AutoLogin implements Action {
    readonly type = AUTO_LOGIN
    constructor() {
    }
}

export type AuthActions = Login | Logout | LoginStart | LoginFail | SignUpStart | ClearError | AutoLogin

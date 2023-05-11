import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError} from 'rxjs/operators';
import {BehaviorSubject, tap, throwError} from "rxjs";
import {UserModel} from "./User.model";
import {Router} from "@angular/router";

export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    user: BehaviorSubject<UserModel> = new BehaviorSubject<UserModel>(null);

    private expiryTimer: any;

    constructor(
        private http: HttpClient,
        private router: Router,
    ) {
    }

    signUp(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDta1UMXSvM_VfioeaOkE3LNiiezzbI1dc',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }).pipe(
            catchError(this.handleError),
            tap(res =>
                this.handleAuthentication(res.email, res.localId, res.idToken, +res.expiresIn)
            ))
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDta1UMXSvM_VfioeaOkE3LNiiezzbI1dc',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }).pipe(
            catchError(this.handleError),
            tap(res =>
                this.handleAuthentication(res.email, res.localId, res.idToken, +res.expiresIn)
            )
        );
    }

    autoLogIn() {
        const user: {
            email: string;
            id: string;
            _token: string;
            _tokenExpiry: string;

        } = JSON.parse(localStorage.getItem('userData'));
        if (!user) {
            return
        }

        const loadedUser = new UserModel(user.email, user.id, user._token, new Date(user._tokenExpiry))
         if (loadedUser.token) {
             this.user.next(loadedUser);
             const  expiryDuration= new Date(user._tokenExpiry).getTime() - new Date().getTime();
             this.autoLogOut(expiryDuration);
         }

    }

    logOut() {
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData')
        if (this.expiryTimer){
            clearTimeout(this.expiryTimer)
        }
        this.expiryTimer = null;
    }

    autoLogOut (expiryDuration: number) {
        this.expiryTimer = setTimeout(() => {
            this.logOut();
        },expiryDuration)
    }

    handleAuthentication(email: string, id: string, token: string, expiration: number) {
        const expiryDate = new Date(new Date().getTime() + (+expiration * 1000));
        const user = new UserModel(email, id, token, expiryDate);
        this.user.next(user);
        this.autoLogOut(expiration * 1000);
        localStorage.setItem('userData', JSON.stringify(user));
    }

    handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'Error: Unknown Error occured';
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(() => errorMessage);
        } else {
            switch (errorRes.error.error.message) {
                case 'EMAIL_EXISTS':
                    errorMessage = 'Error: Email you have entered already exists.';
                    break;

                case 'OPERATION_NOT_ALLOWED':
                    errorMessage = 'Error: Password sign-in is disabled for this project.';
                    break;
                case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                    errorMessage = 'Error: We have blocked all requests from this device due to unusual activity. Try again later.';
                    break;
                case 'EMAIL_NOT_FOUND':
                    errorMessage = 'Error: There is no user record corresponding to this email.';
                    break;
                case 'INVALID_PASSWORD':
                    errorMessage = 'Error: The password is invalid.';
                    break;
                case 'USER_DISABLED':
                    errorMessage = 'Error: The user account has been disabled by an administrator.';
                    break;
            }
            return throwError(() => errorMessage);
        }
    }
}

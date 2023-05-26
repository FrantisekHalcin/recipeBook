import {Actions, createEffect, ofType} from "@ngrx/effects";
import * as fromAuthActions from './auth.actions'
import {map, of, switchMap, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {UserModel} from "../User.model";
import {AuthService} from "../auth.service";

export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable()
export class AuthEffects {

    constructor(
        private actions$: Actions,
        private http: HttpClient,
        private router: Router,
        private as: AuthService,
    ) {
    }

    handleAuthentication = (email: string, id: string, token: string, expiresIn: number) => {
        const expiryDate = new Date(new Date().getTime() + (expiresIn * 1000));
        const user = new UserModel(email, id, token, expiryDate);
        localStorage.setItem('userData', JSON.stringify(user));
        return new fromAuthActions.Login({
            email: email,
            id: id,
            token: token,
            expiration: expiryDate
        })
    }

    handleError = (errorRes) => {
        let errorMessage = 'Error: Unknown Error occured';
        if (!errorRes.error || !errorRes.error.error) {
            return of(new fromAuthActions.LoginFail(errorMessage));
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
            //..
            return of(new fromAuthActions.LoginFail(errorMessage));
        }
    }

    authSignUp$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromAuthActions.SIGN_UP_START),
            switchMap((signUpData: fromAuthActions.SignUpStart) => {
                return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDta1UMXSvM_VfioeaOkE3LNiiezzbI1dc',
                    {
                        email: signUpData.payload.email,
                        password: signUpData.payload.password,
                        returnSecureToken: true
                    })
                    .pipe(
                        tap(res => {
                            this.as.setLogOutTimer(+res.expiresIn * 1000)
                        }),
                        map(res => {
                            return this.handleAuthentication(res.email, res.localId, res.idToken, +res.expiresIn);
                        }),
                        catchError(errorRes => {
                            return this.handleError(errorRes);
                        }),
                    )
            })))

    authLogin$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromAuthActions.LOGIN_START),
            switchMap((authData: fromAuthActions.LoginStart) => {
                return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDta1UMXSvM_VfioeaOkE3LNiiezzbI1dc',
                    {
                        email: authData.payload.email,
                        password: authData.payload.password,
                        returnSecureToken: true
                    })
                    .pipe(
                        tap(res => {
                            this.as.setLogOutTimer(+res.expiresIn * 1000)
                        }),
                        map(res => {
                            return this.handleAuthentication(res.email, res.localId, res.idToken, +res.expiresIn);
                        }),
                        catchError(errorRes => {
                            return this.handleError(errorRes);
                        }),
                    )
            })))

    authRedirect$ = createEffect(() =>
            this.actions$.pipe(
                ofType(fromAuthActions.LOGIN),
                tap(() => {
                    this.router.navigate(['/recipes']);
                })
            ),
        {dispatch: false}
    );


    authLogOut$ = createEffect(() =>
            this.actions$.pipe(
                ofType(fromAuthActions.LOGOUT),
                tap(() => {
                    localStorage.removeItem('userData');
                    this.router.navigate(['/auth']);
                    this.as.clearLogOutTimer();
                })
            ),
        {dispatch: false}
    );

    autoLogin$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromAuthActions.AUTO_LOGIN),
            map(() => {
                const user: {
                    email: string;
                    id: string;
                    _token: string;
                    _tokenExpiry: string;

                } = JSON.parse(localStorage.getItem('userData'));
                if (!user) {
                    return {type: 'dummy'}
                }

                const loadedUser = new UserModel(user.email, user.id, user._token, new Date(user._tokenExpiry))
                if (loadedUser.token) {

                    const expiryDuration= new Date(user._tokenExpiry).getTime() - new Date().getTime();
                    this.as.setLogOutTimer(expiryDuration)
                    return new fromAuthActions.Login({
                        email: user.email,
                        id: user.id,
                        token: user._token,
                        expiration: new Date(user._tokenExpiry)
                    })

                }
                return {type: 'dummy'}
            })
        )
    )


}

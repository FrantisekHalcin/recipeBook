import {Injectable} from '@angular/core';
import {HttpInterceptor} from "@angular/common/http";
import {HttpHandler, HttpEvent, HttpRequest, HttpParams} from "@angular/common/http";
import {exhaustMap, Observable, take, map} from "rxjs";
import {AuthService} from "./auth.service";
import {Store} from "@ngrx/store";
import * as fromAppStore from '../store/app.reducer'

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

    constructor(
        private as: AuthService,
        private store: Store<fromAppStore.AppState>
    ) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.store.select('auth').pipe(
            take(1),
            map((state) => {
                return state.user
            }),
            exhaustMap(user => {
                if (!user) {
                    return next.handle(req);
                }
                const modReq = req.clone({
                    params: new HttpParams().set('auth', user.token)
                })
                return next.handle(modReq)
            }))


    }
}

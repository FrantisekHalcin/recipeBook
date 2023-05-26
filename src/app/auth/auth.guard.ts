import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable, take, map} from 'rxjs';
import {AuthService} from "./auth.service";
import {Store} from "@ngrx/store";
import * as fromAppStore from '../store/app.reducer'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
        private as: AuthService,
        private router: Router,
        private store: Store<fromAppStore.AppState>
    ) {
    }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.store.select('auth').pipe(
            take(1),
            map(state => {
                return state.user
            }),
            map(user => {
                const isAuth = !!user
                if (isAuth) {
                    return true
                }
                return this.router.createUrlTree(['/auth']);
            })
            )
  }

}

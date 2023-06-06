import {Injectable} from '@angular/core';
import {Store} from "@ngrx/store";
import * as fromAuthActions from './store/auth.actions'

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private expiryTimer: any;

    constructor(
        private store: Store,
    ) {
    }
    setLogOutTimer (expiryDuration: number) {
        this.expiryTimer = setTimeout(() => {
            this.store.dispatch(new fromAuthActions.Logout())
        },expiryDuration)
    }

    clearLogOutTimer () {
        if (this.expiryTimer){
            clearTimeout(this.expiryTimer)
        }
        this.expiryTimer = null;
    }


}

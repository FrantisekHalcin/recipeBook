import {Component, OnInit, OnDestroy} from '@angular/core';
import {DataStorageService} from "../shared/data-storage.service";
import {ToastService} from "../toast.service";
import {AuthService} from "../auth/auth.service";
import {Subscription} from "rxjs";
import {UserModel} from "../auth/User.model";
import {map} from "rxjs";
import {Store} from "@ngrx/store";
import * as fromAuth from '../store/app.reducer'
import * as fromAuthActions from "../auth/store/auth.actions";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

    userSub: Subscription;
    isLoggedIn: Boolean = null;

    myTime: number
    myUser: UserModel;
    myInterval: number;

    constructor(
        private ds: DataStorageService,
        private t: ToastService,
        private as: AuthService,
        private store: Store<fromAuth.AppState>
    ) {
    }

    ngOnInit() {
        this.userSub = this.store.select('auth').pipe(map((state) => {
            return state.user
        }))
            .subscribe(
            (user: UserModel) => {
                this.isLoggedIn = !!user;
                this.myUser = user;
                if (this.isLoggedIn) {
                    this.showTime();
                } else {
                    clearInterval(this.myInterval);
                }
            }
        )
    }

    showTime() {
        this.myInterval = setInterval(() => {
            this.myTime = this.myUser.logTime
        }, 1000)
    }

    saveData() {
        this.ds.storeRecipes();
        this.t.snack('Data was saved on the server');
    }

    getData() {
        this.ds.fetchRecipes().subscribe();
    }

    logOut() {
        this.store.dispatch(new fromAuthActions.Logout);
    }

    ngOnDestroy() {
        this.userSub.unsubscribe();
    }

}

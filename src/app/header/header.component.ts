import {Component, OnInit, OnDestroy} from '@angular/core';
import {DataStorageService} from "../shared/data-storage.service";
import {ToastService} from "../toast.service";
import {AuthService} from "../auth/auth.service";
import {Subscription} from "rxjs";
import {UserModel} from "../auth/User.model";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

    userSub: Subscription;
    isLoggedIn: Boolean = null;

    constructor(
        private ds: DataStorageService,
        private t: ToastService,
        private as: AuthService,
    ) {
    }

    ngOnInit() {
        this.userSub = this.as.user.subscribe(
            (user: UserModel) => {
                this.isLoggedIn = !!user;
                console.log('1 ' + !user);
                console.log('2 ' + !!user);
            }
        )
    }

    saveData() {
        this.ds.storeRecipes();
        this.t.snack('Data was saved on the server');
    }

    getData() {
        this.ds.fetchRecipes().subscribe();
    }

    ngOnDestroy() {
        this.userSub.unsubscribe();
    }

}

import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";
import { AlertComponent } from "../shared/alert/alert.component";
import {ViewContainerRef} from "@angular/core";
import {Store} from "@ngrx/store";
import * as fromAppStore from '../store/app.reducer'
import * as fromAuthActions from './store/auth.actions'

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit ,OnDestroy {
    logMode = true;
    isLoading: boolean = false;
    error: string = null;
    mySub: Subscription;
    storeSub: Subscription;

    @ViewChild('tutodaj', { read: ViewContainerRef }) tuRef: ViewContainerRef;

    constructor(
        private store: Store<fromAppStore.AppState>,
    ) {
    }

    ngOnInit() {
        this.storeSub = this.store.select('auth').subscribe(authState => {
            this.isLoading = authState.loading;
            this.error = authState.authError;
            if (this.error) {
                this.showError(this.error)
            }
        })
    }

    switch() {
        this.logMode = !this.logMode;
    }

    onSubmit(form: NgForm) {

        if (!form.valid) {
            return
        }
        const email = form.value.email;
        const password = form.value.password;

        if (this.logMode) {
            this.store.dispatch(new fromAuthActions.LoginStart({email: email, password: password}))
        } else {
            this.store.dispatch(new fromAuthActions.SignUpStart({email: email, password: password}))
        }

        form.reset();
    }

    showError (mess: string) {
        const componentRef = this.tuRef.createComponent(AlertComponent);
        componentRef.instance.mess = mess;
        this.mySub = componentRef.instance.close.subscribe(()=>{
            this.tuRef.clear();
            this.mySub.unsubscribe();

        })
    }

    ngOnDestroy() {
        if (this.mySub){
            this.mySub.unsubscribe();
        }
        if (this.storeSub){
            this.storeSub.unsubscribe();
        }

    }

}

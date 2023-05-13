import {Component, OnDestroy, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthResponseData, AuthService} from "./auth.service";
import {Observable, Subscription} from "rxjs";
import {Router} from "@angular/router";
import { AlertComponent } from "../shared/alert/alert.component";
import {ViewContainerRef} from "@angular/core";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnDestroy {
    logMode = true;
    isLoading: boolean = false;
    error: string = null;
    mySub: Subscription;

    @ViewChild('tutodaj', { read: ViewContainerRef }) tuRef: ViewContainerRef;

    constructor(
        private as: AuthService,
        private router: Router,
    ) {
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

        let authObs: Observable<AuthResponseData>;

        this.isLoading = true;
        if (this.logMode) {
            authObs = this.as.login(email, password)
        } else {
            authObs = this.as.signUp(email, password)
        }

        authObs.subscribe({
            next: (responseData) => {
                this.isLoading = false;
                this.router.navigate(['/recipes']);
            },
            error: (errorMes) => {
                this.isLoading = false

                this.error = errorMes;
                this.showError(errorMes)
            }
        });
        form.reset();
    }

    closeModal() {
        this.error = null;
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

    }

}

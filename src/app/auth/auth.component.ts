import {Component} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthResponseData, AuthService} from "./auth.service";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthComponent {
    logMode = true;
    isLoading: boolean = false;
    error: string = null;

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
                console.log(responseData);
            },
            error: (errorMes) => {
                this.isLoading = false

                this.error = errorMes;
                console.log(errorMes)
            }
        });
        form.reset();
    }

}

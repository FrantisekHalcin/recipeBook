import {NgModule} from '@angular/core';
import {AuthComponent} from "./auth.component";
import {FormsModule} from "@angular/forms";
import {SharedModuleModule} from "../shared/shared-module/shared-module.module";
import {RouterModule} from "@angular/router";


@NgModule({
    declarations: [
        AuthComponent,
    ],
    imports: [
        RouterModule.forChild(
            [{path: '', component: AuthComponent}]
        ),
        FormsModule,
        SharedModuleModule
    ]
})
export class AuthModule {
}

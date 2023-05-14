import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DropdownDirective} from "../../dropdown.directive";
import {LoadingSpinnerComponent} from "../loading-spinner/loading-spinner.component";
import {AlertComponent} from "../alert/alert.component";
import {MatSnackBarModule} from '@angular/material/snack-bar';



@NgModule({
    declarations: [
        DropdownDirective,
        LoadingSpinnerComponent,
        AlertComponent,
    ],
    imports: [
        CommonModule,
        MatSnackBarModule,
    ],
    exports: [
        DropdownDirective,
        AlertComponent,
        LoadingSpinnerComponent,
        CommonModule,
        MatSnackBarModule,
    ]
})
export class SharedModuleModule {
}

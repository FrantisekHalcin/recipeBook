import {NgModule} from '@angular/core';
import {ShoppingListComponent} from "./shopping-list.component";
import {ShoppingEditComponent} from "./shopping-edit/shopping-edit.component";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {SharedModuleModule} from "../shared/shared-module/shared-module.module";


@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingEditComponent,
    ],
    imports: [
        RouterModule.forChild(
            [{path: '', component: ShoppingListComponent}]
        ),
        FormsModule,
        SharedModuleModule
    ]
})
export class ShoppingListModule {
}

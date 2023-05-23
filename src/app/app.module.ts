import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AuthInterceptorService} from "./auth/auth-interceptor.service";
import {SharedModuleModule} from "./shared/shared-module/shared-module.module";
import {StoreModule} from "@ngrx/store";
import {shoppingListReducer} from "./shopping-list/store/shopping-list-reducer";


@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent
    ],
    imports: [
        BrowserModule,
        StoreModule.forRoot({shoppingList: shoppingListReducer}),
        AppRoutingModule,
        HttpClientModule,
        SharedModuleModule,
        BrowserAnimationsModule,
    ],
    exports: [

    ],
    providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}],
    bootstrap: [AppComponent]
})
export class AppModule {
}

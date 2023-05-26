import {Component, OnInit, OnDestroy} from '@angular/core';
import {IngredientModel} from "../shared/ingredient.model";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import * as shopListActions from "./store/shopping-list-actions";
import * as fromAppStore from '../store/app.reducer'

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
    ingredients: Observable<{ ingredients: IngredientModel [] } >

    constructor(
        private store: Store<fromAppStore.AppState>,
    ) {
    }

    ngOnInit() {
        this.ingredients = this.store.select('shoppingList')
    }

    onEdit(i: number) {
        this.store.dispatch(new shopListActions.StartEdit(i))
    }

    ngOnDestroy() {
    }

}

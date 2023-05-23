import {Component, OnInit, OnDestroy} from '@angular/core';
import {IngredientModel} from "../shared/ingredient.model";
import {ShopListService} from "./shop-list.service";
import {Observable, Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import * as shopListActions from "./store/shopping-list-actions";

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
    ingredients: Observable<{ ingredients: IngredientModel [] } >
    // private ingChangedSub: Subscription;

    constructor(
        private sl: ShopListService,
        private store: Store<{ shoppingList: { ingredients: IngredientModel [] } }>,
    ) {
    }

    ngOnInit() {
        this.ingredients = this.store.select('shoppingList')
        // this.ingredients = this.sl.getIngredients()
        // this.ingChangedSub = this.sl.ingredientsChanged.subscribe(
        //     (ings) => {
        //         this.ingredients = ings;
        //     }
        // )
    }

    onEdit(i: number) {
        this.store.dispatch(new shopListActions.StartEdit(i))
        // this.sl.startEditing.next(i);
    }

    ngOnDestroy() {
        // this.ingChangedSub.unsubscribe()
    }

}

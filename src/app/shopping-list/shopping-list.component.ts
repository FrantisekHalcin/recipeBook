import {Component, OnInit, OnDestroy} from '@angular/core';
import {IngredientModel} from "../shared/ingredient.model";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import * as shopListActions from "./store/shopping-list-actions";
import * as fromAppStore from '../store/app.reducer'
import {trigger, state, style, animate, transition} from '@angular/animations';

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrls: ['./shopping-list.component.css'],
    animations: [
        trigger('shopList', [
            state('in', style({
                opacity: 0,
                transform: 'translateY(0)'
            })),
            transition('void => *', [
                style({
                    opacity: 1,
                    transform: 'translateY(50px)'
                }),
                animate('300ms ease-in')]
            ),
            transition('* => void', [
                animate(
                    '500ms ease-out',
                    style({
                    opacity: 0,
                    transform: 'translateX(-150px)'
                }), )]
            )
        ])
    ]
})
export class ShoppingListComponent implements OnInit, OnDestroy {
    ingredients: Observable<{ ingredients: IngredientModel [] }>

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

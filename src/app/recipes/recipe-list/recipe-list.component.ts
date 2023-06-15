import {Component, OnDestroy, OnInit} from '@angular/core';
import {RecipeModel} from "../recipe.model";
import {Subscription} from "rxjs";
import {AppState} from "../../store/app.reducer";
import {Store} from "@ngrx/store";
import {map} from "rxjs";
import {fetch_recipes} from "../store/recipes.actions";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
    selector: 'app-recipe-list',
    templateUrl: './recipe-list.component.html',
    styleUrls: ['./recipe-list.component.css'],
    animations: [
        trigger('recList', [
            state('recIn', style({
                opacity: 1,
            })),
            transition('void => *', [
                style({
                    opacity: 0,
                }),
                animate(500)]
            ),
            transition('* => void', [
                animate(500,
                    style({
                        opacity: 0,
                    })
                )]
            ),
        ])
    ]
})
export class RecipeListComponent implements OnInit, OnDestroy {
    recipes: RecipeModel[];
    storeSub: Subscription;

    constructor(
        private store: Store<AppState>
    ) {
    }

    ngOnInit() {
        this.storeSub = this.store.select('recipes')
            .pipe(
                map(object => object.recipes))
            .subscribe(
                rec => {
                    this.recipes = rec;
                }
            );

        if (this.recipes.length === 0) {
            this.store.dispatch(fetch_recipes());
        }
    }

    ngOnDestroy() {
        this.storeSub.unsubscribe();
    }
}

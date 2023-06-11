import {Component, OnInit} from '@angular/core';
import {RecipeModel} from "../recipe.model";
import {IngredientModel} from "../../shared/ingredient.model";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastService} from "../../toast.service";
import * as ShoppingListActions from "../../shopping-list/store/shopping-list-actions";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/app.reducer";
import {map, switchMap} from 'rxjs/operators'
import {delete_recipe} from "../store/recipes.actions";

@Component({
    selector: 'app-recipe-detail',
    templateUrl: './recipe-detail.component.html',
    styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
    clickedR: RecipeModel;
    id: number;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private t: ToastService,
        private store: Store<AppState>
    ) {
    }

    ngOnInit() {

        this.route.params.pipe(
            map(params => +params['id']),
            switchMap(id => {
                this.id = id;
                return this.store.select('recipes')
            }),
            map((object) => {
                return object.recipes.find((recipes, index) => {
                    return index === this.id;
                })
            })
        ).subscribe(recipe => this.clickedR = recipe)
    }

    addIngs(ings: IngredientModel[]) {
        this.store.dispatch(new ShoppingListActions.AddIngredients(ings))
        this.t.snack('The ingredients was added to the shopping list')
    }

    deleteR() {
        this.store.dispatch(delete_recipe({id: this.id}))
        this.router.navigate(['../'], {relativeTo: this.route})
        this.t.snack('The recipe was deleted', 'red')
    }

}

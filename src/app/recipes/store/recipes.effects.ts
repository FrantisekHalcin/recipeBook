import {Actions, createEffect, ofType} from "@ngrx/effects";
import {map, switchMap, withLatestFrom} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {RecipeModel} from "../recipe.model";
import {Injectable} from "@angular/core";
import {store_recipes, fetch_recipes, set_recipes} from "./recipes.actions";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/app.reducer";

@Injectable()
export class RecipesEffects {

    constructor(
        private actions$: Actions,
        private http: HttpClient,
        private store: Store<AppState>
    ) {
    }

    fetchRecipes$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetch_recipes),
            switchMap(() =>
                this.http.get<RecipeModel[]>('https://recipes-book-ng-default-rtdb.firebaseio.com/recipes.json')
            ),
            map((recipes: RecipeModel[]) => {
                return recipes.map(r => {
                    return {...r, ingredients: r.ingredients ? r.ingredients : []}
                })
            }),
            map(recipes => set_recipes({payload: recipes}))
        )
    );

    storeRecipes$ = createEffect(() =>
        this.actions$.pipe(
            ofType(store_recipes),
            withLatestFrom(this.store.select('recipes')),
            switchMap(([actionData, recipesState]) => {
                return this.http.put<RecipeModel[]>('https://recipes-book-ng-default-rtdb.firebaseio.com/recipes.json', recipesState.recipes)
            }),
        ),{ dispatch: false })

}

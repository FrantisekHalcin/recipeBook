import { Injectable } from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {map, Observable, of, switchMap, take} from "rxjs";
import {RecipeModel} from "./recipe.model";
import {Store} from "@ngrx/store";
import {AppState} from "../store/app.reducer";
import {fetch_recipes, set_recipes} from "./store/recipes.actions";
import {Actions, ofType} from "@ngrx/effects";

@Injectable({
  providedIn: 'root'
})
export class RecipeResolverService implements Resolve<RecipeModel[]> {

  constructor(
      private store: Store<AppState>,
      private actions$: Actions,
              ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<RecipeModel[]> | Promise<RecipeModel[]> | RecipeModel[] {
        return this.store.select('recipes').pipe(
            take(1),
            map(object => object.recipes),
            switchMap(recipes => {
                if (recipes.length === 0) {
                    this.store.dispatch(fetch_recipes());
                    return this.actions$.pipe(
                        ofType(set_recipes),
                        take<RecipeModel[]>(1)
                    );
                } else {
                    return of(recipes);
                }
            })
        );
    }

}

import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {RecipesService} from "../recipes/recipes.service";
import {RecipeModel} from "../recipes/recipe.model";
import {map, tap} from "rxjs";
import {AuthService} from "../auth/auth.service";

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {

    url: string = 'https://recipes-book-ng-default-rtdb.firebaseio.com/'

    constructor(
        private http: HttpClient,
        private rs: RecipesService,
        private as: AuthService,
    ) {
    }

    storeRecipes() {
        const recipes: RecipeModel[] = this.rs.getRecipes();
        this.http.put(this.url + 'recipes.json', recipes)
            .subscribe(
                response => {
                }
            );
    }

    fetchRecipes() {
                return this.http.get(this.url + 'recipes.json',)
                    .pipe(
                    map((data: RecipeModel[]) => {
                        return data.map(r => {
                            return {...r, ingredients: r.ingredients ? r.ingredients : []}
                        })
                    }),
                    tap((recipes: RecipeModel[]) => {
                        this.rs.setRecipesServer(recipes)
                    })
                )
            }
}

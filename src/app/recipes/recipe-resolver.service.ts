import { Injectable } from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {RecipeModel} from "./recipe.model";
import {DataStorageService} from "../shared/data-storage.service";
import {RecipesService} from "./recipes.service";

@Injectable({
  providedIn: 'root'
})
export class RecipeResolverService implements Resolve<RecipeModel[]> {

  constructor(
      private ds: DataStorageService,
      private rs: RecipesService
              ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<RecipeModel[]> | Promise<RecipeModel[]> | RecipeModel[] {
      const recipes = this.rs.getRecipes()
      if (recipes.length === 0) {
          return this.ds.fetchRecipes();
      } else {
          return recipes;
      }

    }
}

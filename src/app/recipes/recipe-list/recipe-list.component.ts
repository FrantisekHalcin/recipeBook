import {Component, OnDestroy, OnInit} from '@angular/core';
import {RecipeModel} from "../recipe.model";
import {RecipesService} from "../recipes.service";
import {Subscription} from "rxjs";
import {DataStorageService} from "../../shared/data-storage.service";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: RecipeModel[];
  sub: Subscription;
  sub2 : Subscription;

  constructor(
    private rec : RecipesService,
    private ds : DataStorageService,
  ) {
  }

  ngOnInit() {
      this.recipes = this.rec.getRecipes();
      this.sub2 = this.ds.fetchRecipes().subscribe(
          rec => {
              this.recipes = rec;
          }
      );
      this.sub = this.rec.recipesChanged.subscribe(
          (recipes) => {
              this.recipes = recipes;
          }
      )

  }

  ngOnDestroy() {
      this.sub.unsubscribe();
      this.sub2.unsubscribe();
  }
}

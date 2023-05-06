import {Component, OnDestroy, OnInit} from '@angular/core';
import {RecipeModel} from "../recipe.model";
import {RecipesService} from "../recipes.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: RecipeModel[];
  sub: Subscription;

  constructor(
    private rec : RecipesService,
  ) {
  }

  ngOnInit() {
      this.recipes = this.rec.getRecipes();
      this.sub = this.rec.recipesChanged.subscribe(
          (recipes) => {
              this.recipes = recipes;
          }
      )

  }

  ngOnDestroy() {
      this.sub.unsubscribe();
  }
}

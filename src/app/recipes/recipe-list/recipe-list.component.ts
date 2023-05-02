import {Component, OnInit} from '@angular/core';
import {RecipeModel} from "../recipe.model";
import {RecipesService} from "../recipes.service";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: RecipeModel[];

  constructor(
    private rec : RecipesService
  ) {
  }

  showDetail(r: RecipeModel) {
    this.rec.selectedRecipe.emit(r);
  }

  ngOnInit() {
    this.recipes = this.rec.getRecipes();
  }
}

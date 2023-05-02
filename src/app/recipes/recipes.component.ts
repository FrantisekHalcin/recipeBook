import { Component, OnInit } from '@angular/core';
import {RecipeModel} from "./recipe.model";
import {RecipesService} from "./recipes.service";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})


export class RecipesComponent implements OnInit {
  selectedR: RecipeModel;

  constructor(
    private rec : RecipesService
  ) {
  }

  ngOnInit() {
    this.rec.selectedRecipe.subscribe(
      (recipe:RecipeModel) => {
        this.selectedR = recipe;
      }
    )
  }

}

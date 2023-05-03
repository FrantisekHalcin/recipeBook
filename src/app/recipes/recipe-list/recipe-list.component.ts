import {Component, OnInit} from '@angular/core';
import {RecipeModel} from "../recipe.model";
import {RecipesService} from "../recipes.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: RecipeModel[];

  constructor(
    private rec : RecipesService,
    private router: Router
  ) {
  }

  showDetail(i: number) {
    this.router.navigate(['/recipes', i])
  }

  ngOnInit() {
    this.recipes = this.rec.getRecipes();
  }
}

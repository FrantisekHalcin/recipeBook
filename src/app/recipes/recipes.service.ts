import {EventEmitter, Injectable} from '@angular/core';
import {RecipeModel} from "./recipe.model";
import {IngredientModel} from "../shared/ingredient.model";

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private recipes: RecipeModel[] = [
    new RecipeModel('Spaghetti',
      'How to prepare delicious dinner',
      'https://media.istockphoto.com/id/1341564316/photo/spaghetti-and-meatballs.jpg?b=1&s=170667a&w=0&k=20&c=bSfMJCKXDP2qeFZxlfp6vZDiWCy0Uhhx6v53xZJE5HI=',
      [
        new IngredientModel('pasta',0.5),
        new IngredientModel('beef', 1),
        new IngredientModel('tomatoes', 3)
      ]),

    new RecipeModel('Lasagne',
      'My favourite food and easy to prepare!',
      'https://media.istockphoto.com/id/535851351/photo/lasagna-on-a-square-white-plate.jpg?s=612x612&w=0&k=20&c=Rg1K7z4NlWhy2qexaym_GJ0khcJFSJUJgToTN2cRspM=',
      [
        new IngredientModel('lasagne', 1),
        new IngredientModel('mince beef', 1),
        new IngredientModel('cheese', 0.5),
        new IngredientModel('salt', 0.1)
      ]),
    new RecipeModel('Spaghetti',
      'How to prepare delicious dinner',
      'https://media.istockphoto.com/id/1341564316/photo/spaghetti-and-meatballs.jpg?b=1&s=170667a&w=0&k=20&c=bSfMJCKXDP2qeFZxlfp6vZDiWCy0Uhhx6v53xZJE5HI=',
      [
        new IngredientModel('pasta',0.5),
        new IngredientModel('beef', 1),
        new IngredientModel('tomatoes', 3)
      ]),

    new RecipeModel('Lasagne',
      'My favourite food and easy to prepare!',
      'https://media.istockphoto.com/id/535851351/photo/lasagna-on-a-square-white-plate.jpg?s=612x612&w=0&k=20&c=Rg1K7z4NlWhy2qexaym_GJ0khcJFSJUJgToTN2cRspM=',
      [
        new IngredientModel('lasagne', 1),
        new IngredientModel('mince beef', 1),
        new IngredientModel('cheese', 0.5),
        new IngredientModel('salt', 0.1)
      ])
  ];

  selectedRecipe = new EventEmitter<RecipeModel>();

  constructor() { }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }
}

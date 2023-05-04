import {Injectable} from '@angular/core';
import {IngredientModel} from "../shared/ingredient.model";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShopListService {

  ingredientsChanged = new Subject <IngredientModel[]>();

  private ingredients = [
    new IngredientModel('spaghetti', 0.5),
    new IngredientModel('egg', 2),
    new IngredientModel('beef', 0.5),
    new IngredientModel('tomatoes', 0.5),
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  addIn(ing: IngredientModel) {
    this.ingredients.push(ing);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addAllIngs(ings: IngredientModel[]) {
    this.ingredients.push(...ings);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  constructor() { }
}

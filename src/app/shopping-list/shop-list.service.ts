import {EventEmitter, Injectable} from '@angular/core';
import {IngredientModel} from "../shared/ingredient.model";

@Injectable({
  providedIn: 'root'
})
export class ShopListService {

  ingredientsChanged = new EventEmitter <IngredientModel[]>();

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
    this.ingredientsChanged.emit(this.ingredients.slice());
  }

  addAllIngs(ings: IngredientModel[]) {
    this.ingredients.push(...ings);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }

  constructor() { }
}

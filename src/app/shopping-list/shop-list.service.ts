import {Injectable} from '@angular/core';
import {IngredientModel} from "../shared/ingredient.model";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShopListService {

  ingredientsChanged = new Subject <IngredientModel[]>();
  startEditing: Subject<number> = new Subject<number>();

  private ingredients = [
    new IngredientModel('spaghetti', 1),
    new IngredientModel('egg', 2),
    new IngredientModel('beef', 1),
    new IngredientModel('tomatoes', 3),
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(i: number) : IngredientModel {
    return this.ingredients[i];
  }

  saveIngredient (ing:IngredientModel, i:number) {
    this.ingredients[i] = ing;
    this.ingredientsChanged.next(this.ingredients.slice())
  }

  addIn(ing: IngredientModel) {
    this.ingredients.push(ing);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addAllIngs(ings: IngredientModel[]) {
    this.ingredients.push(...ings);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIng(i: number) {
      this.ingredients.splice(i, 1)
      this.ingredientsChanged.next(this.ingredients.slice());
  }

  constructor() { }
}

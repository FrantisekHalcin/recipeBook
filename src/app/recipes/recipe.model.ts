import {IngredientModel} from "../shared/ingredient.model";

export class RecipeModel {
  public name : string;
  public description : string;
  public imageUrl : string;
  public ingredients: IngredientModel[]

  constructor(name : string, desc : string, img : string, ings : IngredientModel[]) {
    this.name = name;
    this.description = desc;
    this.imageUrl = img;
    this.ingredients = ings;
  }
}

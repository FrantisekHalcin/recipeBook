import {IngredientModel} from "../shared/ingredient.model";

export class RecipeModel {
  public name : string;
  public description : string;
  public imagePath : string;
  public ingredients: IngredientModel[]

  constructor(name : string, desc : string, img : string, ings : IngredientModel[]) {
    this.name = name;
    this.description = desc;
    this.imagePath = img;
    this.ingredients = ings;
  }
}

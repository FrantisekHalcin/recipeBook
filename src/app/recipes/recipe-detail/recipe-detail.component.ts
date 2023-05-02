import {Component, Input} from '@angular/core';
import {RecipeModel} from "../recipe.model";
import {ShopListService} from "../../shopping-list/shop-list.service";
import {IngredientModel} from "../../shared/ingredient.model";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent {
@Input() clickedR : RecipeModel;

constructor(
  private sl: ShopListService
) {
}

addIngs(ings: IngredientModel[]){
  // for (const ing of ings) {
  //   this.sl.addIn(ing);
  // }
  this.sl.addAllIngs(ings);
}

}

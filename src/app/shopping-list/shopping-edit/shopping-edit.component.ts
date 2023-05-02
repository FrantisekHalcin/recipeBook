import {Component} from '@angular/core';
import {IngredientModel} from "../../shared/ingredient.model";
import {ShopListService} from "../shop-list.service";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {

constructor(
  private sl : ShopListService
) {
}

  onAdd(n : string, a : number) {
    this.sl.addIn(new IngredientModel(n,a));
  }

}

import {Component, EventEmitter, Output} from '@angular/core';
import {IngredientModel} from "../../shared/ingredient.model";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {
@Output() newIng = new EventEmitter<IngredientModel>();
  onAdd(n : string, a : number) {

    this.newIng.emit(new IngredientModel(n,a));
  }

}

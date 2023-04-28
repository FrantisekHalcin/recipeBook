import { Component, OnInit } from '@angular/core';
import {IngredientModel} from "../shared/ingredient.model";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients : IngredientModel[] = []

  ngOnInit() {
     this.ingredients = [
      new IngredientModel('spaghetti', 0.5),
      new IngredientModel('egg', 2),
      new IngredientModel('beef', 0.5),
      new IngredientModel('tomatoes', 0.5),
    ];
  }



  addIng(ing: IngredientModel) {
    this.ingredients.push(ing);
  }
}

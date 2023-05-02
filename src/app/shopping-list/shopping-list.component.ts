import { Component, OnInit } from '@angular/core';
import {IngredientModel} from "../shared/ingredient.model";
import {ShopListService} from "./shop-list.service";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients : IngredientModel[] = []

  constructor(
    private sl : ShopListService
  ) {
  }

  ngOnInit() {
     this.ingredients = this.sl.getIngredients()
    this.sl.ingredientsChanged.subscribe(
      (ings) => {
        this.ingredients = ings;
      }
    )
  }

}

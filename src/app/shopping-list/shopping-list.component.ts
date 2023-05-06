import { Component, OnInit, OnDestroy } from '@angular/core';
import {IngredientModel} from "../shared/ingredient.model";
import {ShopListService} from "./shop-list.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients : IngredientModel[] = []
  private ingChangedSub: Subscription;

  constructor(
    private sl : ShopListService
  ) {
  }

  ngOnInit() {
     this.ingredients = this.sl.getIngredients()
    this.ingChangedSub = this.sl.ingredientsChanged.subscribe(
      (ings) => {
        this.ingredients = ings;
      }
    )
  }

  onEdit(i:number) {
    this.sl.startEditing.next(i);
  }

  ngOnDestroy() {
    this.ingChangedSub.unsubscribe()
  }

}

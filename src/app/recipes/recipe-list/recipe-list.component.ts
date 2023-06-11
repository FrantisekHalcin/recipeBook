import {Component, OnDestroy, OnInit} from '@angular/core';
import {RecipeModel} from "../recipe.model";
import {Subscription} from "rxjs";
import {AppState} from "../../store/app.reducer";
import {Store} from "@ngrx/store";
import {map} from "rxjs";
import {fetch_recipes} from "../store/recipes.actions";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: RecipeModel[];
  storeSub : Subscription;

  constructor(
    private store: Store<AppState>
  ) {
  }

  ngOnInit() {
      this.storeSub = this.store.select('recipes')
          .pipe(
              map(object => object.recipes))
          .subscribe(
          rec => {
              this.recipes = rec;
          }
      );

      this.store.dispatch(fetch_recipes());
  }

  ngOnDestroy() {
      this.storeSub.unsubscribe();
  }
}

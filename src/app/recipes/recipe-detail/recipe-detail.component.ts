import {Component, OnInit} from '@angular/core';
import {RecipeModel} from "../recipe.model";
import {IngredientModel} from "../../shared/ingredient.model";
import {RecipesService} from "../recipes.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ToastService} from "../../toast.service";
import * as ShoppingListActions from "../../shopping-list/store/shopping-list-actions";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
clickedR : RecipeModel;
id: number;

constructor(
  private rs: RecipesService,
  private route: ActivatedRoute,
  private router: Router,
  private t: ToastService,
  private store: Store
) {
}

ngOnInit() {

  this.route.params.subscribe(
    (params: Params) => {
        this.id = +params['id'];
      this.clickedR = this.rs.getRecipe(this.id)
    }
  )
}

  addIngs(ings: IngredientModel[]){
  this.store.dispatch(new ShoppingListActions.AddIngredients(ings))
  this.t.snack('The ingredients was added to the shopping list')
}

    deleteR() {
        this.rs.deleteRecipe(this.id);
        this.router.navigate(['../'], {relativeTo: this.route})
        this.t.snack('The recipe was deleted', 'red')
    }

}

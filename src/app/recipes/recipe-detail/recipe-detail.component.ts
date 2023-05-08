import {Component, OnInit} from '@angular/core';
import {RecipeModel} from "../recipe.model";
import {ShopListService} from "../../shopping-list/shop-list.service";
import {IngredientModel} from "../../shared/ingredient.model";
import {RecipesService} from "../recipes.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ToastService} from "../../toast.service";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
clickedR : RecipeModel;
id: number;

constructor(
  private sl: ShopListService,
  private rs: RecipesService,
  private route: ActivatedRoute,
  private router: Router,
  private t: ToastService,
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
  // for (const ing of ings) {
  //   this.sl.addIn(ing);
  // }
  this.sl.addAllIngs(ings);
  this.t.snack('The ingredients was added to the shopping list')
}

    deleteR() {
        this.rs.deleteRecipe(this.id);
        this.router.navigate(['../'], {relativeTo: this.route})
        this.t.snack('The recipe was deleted', 'red')
    }

}

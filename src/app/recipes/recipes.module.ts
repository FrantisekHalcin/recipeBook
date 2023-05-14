import {NgModule} from '@angular/core';
import {RecipesComponent} from "./recipes.component";
import {RecipeDetailComponent} from "./recipe-detail/recipe-detail.component";
import {RecipeListComponent} from "./recipe-list/recipe-list.component";
import {RecipeItemComponent} from "./recipe-list/recipe-item/recipe-item.component";
import {EditRecipeComponent} from "./edit-recipe/edit-recipe.component";
import {StartRecipesComponent} from "./start-recipes/start-recipes.component";
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModuleModule} from "../shared/shared-module/shared-module.module";
import {RecipesRoutingModule} from "./recipes-routing/recipes-routing.module";


@NgModule({
    declarations: [
        RecipesComponent,
        RecipeDetailComponent,
        RecipeListComponent,
        RecipeItemComponent,
        EditRecipeComponent,
        StartRecipesComponent,
    ],
    imports: [
        ReactiveFormsModule,
        SharedModuleModule,
        RecipesRoutingModule,
    ],
    exports: [
    ]
})
export class RecipesModule {
}

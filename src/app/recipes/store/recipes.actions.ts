import {Action, createAction, props} from "@ngrx/store";
import {RecipeModel} from "../recipe.model";

export const set_recipes = createAction('[Recipes] Set Recipes', props<{ payload: RecipeModel[] }>())
export const fetch_recipes = createAction('[Recipes] Fetch Recipes')
export const add_recipe = createAction('[Recipes] Add Recipe', props<{ recipe: RecipeModel }>())
export const delete_recipe = createAction('[Recipes] Delete Recipe', props<{ id: number }>())
export const update_recipe = createAction('[Recipes] Update Recipe', props<{ recipe: RecipeModel, id: number }>())
export const store_recipes = createAction('[Recipes] Store Recipes')

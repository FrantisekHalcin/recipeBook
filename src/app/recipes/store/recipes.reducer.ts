import {RecipeModel} from "../recipe.model";
import {createReducer, on} from "@ngrx/store";
import {add_recipe, delete_recipe, set_recipes, update_recipe} from "./recipes.actions";

export interface State {
    recipes: RecipeModel[]
}

const initialState: State = {
    recipes: []
}

/**
 * recipes backup
 */
    // [
    //     new RecipeModel('Spaghetti',
    //         'How to prepare delicious dinner',
    //         'https://media.istockphoto.com/id/1341564316/photo/spaghetti-and-meatballs.jpg?b=1&s=170667a&w=0&k=20&c=bSfMJCKXDP2qeFZxlfp6vZDiWCy0Uhhx6v53xZJE5HI=',
    //         [
    //             new IngredientModel('pasta', 1),
    //             new IngredientModel('beef', 1),
    //             new IngredientModel('tomatoes', 3)
    //         ]),
    //     new RecipeModel('Pancakes',
    //         'The best pancakes you have ever taste',
    //         'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    //         [
    //             new IngredientModel('milk', 1),
    //             new IngredientModel('egg', 1),
    //             new IngredientModel('vanilla sugar', 1),
    //             new IngredientModel('lemon', 1)
    //         ]),
    //
    //     new RecipeModel('Lasagne',
    //         'My favourite food and easy to prepare!',
    //         'https://media.istockphoto.com/id/535851351/photo/lasagna-on-a-square-white-plate.jpg?s=612x612&w=0&k=20&c=Rg1K7z4NlWhy2qexaym_GJ0khcJFSJUJgToTN2cRspM=',
    //         [
    //             new IngredientModel('lasagne', 1),
    //             new IngredientModel('mince beef', 1),
    //             new IngredientModel('cheese', 1),
    //             new IngredientModel('salt', 1)
    //         ]),
    //     new RecipeModel('Spaghetti',
    //         'How to prepare delicious dinner',
    //         'https://media.istockphoto.com/id/1341564316/photo/spaghetti-and-meatballs.jpg?b=1&s=170667a&w=0&k=20&c=bSfMJCKXDP2qeFZxlfp6vZDiWCy0Uhhx6v53xZJE5HI=',
    //         [
    //             new IngredientModel('pasta', 2),
    //             new IngredientModel('beef', 1),
    //             new IngredientModel('tomatoes', 3)
    //         ]),
    //
    //     new RecipeModel('Lasagne',
    //         'My favourite food and easy to prepare!',
    //         'https://media.istockphoto.com/id/535851351/photo/lasagna-on-a-square-white-plate.jpg?s=612x612&w=0&k=20&c=Rg1K7z4NlWhy2qexaym_GJ0khcJFSJUJgToTN2cRspM=',
    //         [
    //             new IngredientModel('lasagne', 1),
    //             new IngredientModel('mince beef', 1),
    //             new IngredientModel('cheese', 3),
    //             new IngredientModel('salt', 2)
    //         ])
    // ]


export const recipesReducer = createReducer(
    initialState,
    on(set_recipes, (state, props) => {
        return {...state, recipes: props.payload}}
    ),
    on(add_recipe, (state, props) => {
        return {...state, recipes: [...state.recipes, props.recipe]}
    }),
    on(update_recipe, (state, props) => {
        const updatedRecipe = {
            ...state.recipes[props.id],
            ...props.recipe
        }
        const updatedRecipes = [ ...state.recipes ];
        updatedRecipes[props.id] = updatedRecipe;

        return {...state, recipes: updatedRecipes}
    }),
    on(delete_recipe, (state, props) => {
        return {...state, recipes: state.recipes.filter((recipe, index) => {
            return index !== props.id;
            })}
    })
)

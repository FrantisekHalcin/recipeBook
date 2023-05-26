import {IngredientModel} from "../../shared/ingredient.model";
import * as ShoppingListActions from "./shopping-list-actions";

export interface State {
    ingredients: IngredientModel[],
    editedIng: IngredientModel,
    editedIngIndex: number,
}


const initialState: State = {
    ingredients : [
        new IngredientModel('spaghetti', 1),
        new IngredientModel('egg', 2),
        new IngredientModel('beef', 1),
        new IngredientModel('tomatoes', 3),
    ],
    editedIng: null,
    editedIngIndex: -1,
}

export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShopListActions) {
switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
    return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
    };
    case ShoppingListActions.ADD_INGREDIENTS:
        return {
            ...state,
            ingredients: [...state.ingredients, ...action.payload]
        };
    case ShoppingListActions.UPDATE_INGREDIENT:
        const ingredient = state.ingredients[state.editedIngIndex]
        const updatedIngredient = {
            ...ingredient,
            ...action.payload
        };
        const updatedIngs = [...state.ingredients];
        updatedIngs[state.editedIngIndex] = updatedIngredient;
        return {
            ...state,
            ingredients: updatedIngs,
            editedIngIndex: -1,
            editedIng: null,
        }

    case ShoppingListActions.DELETE_INGREDIENT:
        return {
            ...state,
            ingredients: state.ingredients.filter((ing ,index) => {
                return index !== state.editedIngIndex;
            }),
            editedIngIndex: -1,
            editedIng: null,
        }

    case ShoppingListActions.START_EDIT:
        return {
            ...state,
            editedIngIndex: action.payload,
            editedIng: {...state.ingredients[action.payload]}
        }

    case ShoppingListActions.STOP_EDIT:
        return {
            ...state,
            editedIngIndex: -1,
            editedIng: null
        }

    default: return state;
}
}

import {UserModel} from "../User.model";
import * as fromAuthActions from '../store/auth.actions'

export interface State {
    user: UserModel,
    authError: string,
    loading: boolean,
}

const initialState: State = {
    user: null,
    authError: null,
    loading: false,
}

export function authReducer(state = initialState, action: fromAuthActions.AuthActions) {
    switch (action.type) {
        case fromAuthActions.LOGIN:
            const user = new UserModel(action.payload.email, action.payload.id, action.payload.token, action.payload.expiration)
            return  {
                ...state,
                user: user,
                authError: null,
                loading: false,
            }
        case fromAuthActions.LOGOUT:
            return {
                ...state,
                user: null
            }
        case fromAuthActions.LOGIN_START:
        case fromAuthActions.SIGN_UP_START:
            return {
                ...state,
                authError: null,
                loading: true,
            }
        case fromAuthActions.LOGIN_FAIL:
            return {
                ...state,
                user: null,
                authError: action.payload,
                loading: false,
            }
        case fromAuthActions.CLEAR_ERROR:
            return {
                ...state,
                authError: null
            }
        default:
            return state;
    }
}

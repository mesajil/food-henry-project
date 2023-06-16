import { actionTypes } from './actions'

const initialState = {
    recipes: [],
}


export default function (state = initialState, action) {
    switch (action.type) {
        case actionTypes.ADD_RECIPES:
            state.recipes.push(...action.payload)
            return state
        default:
            return state;
    }
}

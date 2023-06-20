import * as db from './db'
import { actionTypes } from '../redux/actions'



export const getRecipes = async (dispatch) => {
    dispatch({
        type: actionTypes.GET_RECIPES,
        payload: db.recipes,
    })
}

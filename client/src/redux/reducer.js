import { actionTypes } from './actions'

const initialState = {
    recipes: [],
    filter: [],
    diets: [],
}


export default function (state = initialState, action) {
    let filter;
    switch (action.type) {
        case actionTypes.GET_RECIPES:
            return { ...state, recipes: action.payload, filter: action.payload }
        case actionTypes.FILTER:
            return filterByFilterOBject(state, action.payload)
        case actionTypes.GET_DIETS:
            return { ...state, diets: action.payload }
        case actionTypes.CREATE_RECIPE:
            return { ...state, recipes: state.recipes.concat(action.payload) }
        default:
            return { ...state };
    }
}


const filterByFilterOBject = (state, payload) => {
    const { type, dataSource, sorting } = payload
    let filter = state.recipes.filter((recipe) => type === 'all' || recipe.diets.includes(type))
    if (dataSource !== 'all') {
        if (dataSource === 'database')
            filter = filter.filter((recipe) => recipe.created)
        else if (dataSource === 'api')
            filter = filter.filter((recipe) => !recipe.created)
    }

    if (sorting.value !== 'default') {
        if (sorting.name === 'sortByName') {
            const compareObjectsByName = (obj1, obj2) => {
                const name1 = obj1.name.toUpperCase()
                const name2 = obj2.name.toUpperCase()
                if (name1 < name2) return -1
                else if (name1 > name2) return 1
                else return 0;
            }
            filter.sort((r1, r2) => sorting.value === 'A'
                ? compareObjectsByName(r1, r2)
                : compareObjectsByName(r2, r1))
        }
        else if (sorting.name === 'sortByHealthScore') {
            filter.sort((r1, r2) => sorting.value === 'A'
                ? r1.healthScore - r2.healthScore
                : r2.healthScore - r1.healthScore)
        }
    }
    return { ...state, filter }
}
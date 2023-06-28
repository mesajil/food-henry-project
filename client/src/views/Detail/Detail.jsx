import { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import style from './Detail.module.css'
import Instructions from '../../components/Instructions/Instructions';
import getRecipeById from '../../services/getRecipeById';

export default function () {
    const { id } = useParams()
    const [recipe, setRecipe] = useState({})

    useEffect(() => {
        const fetchRecipe = async (id) => {
            const { data: recipe, message } = await getRecipeById(id)
            if (!recipe) { console.log(message) }
            else { setRecipe(recipe) }
        }
        fetchRecipe(id)
    }, [])

    return <div className={style.container}>
        <Link to={'/home'}>
            <button>Go back</button>
        </Link>
        {recipe
            ? <div className={style.recipe}>
                <h2>{recipe.name}</h2>
                <img src={recipe.image} alt={recipe.name} />
                <h4>id: {recipe.id}</h4>
                <p>Diets: {recipe.diets ? recipe.diets.join(', ') : ""}</p>
                <p>{recipe.summary}</p>
                <p>Health score: {recipe.healthScore}</p>
                <Instructions instructions={recipe.steps}></Instructions>
            </div>
            : <p>Loading recipe ...</p>}
    </div>
}
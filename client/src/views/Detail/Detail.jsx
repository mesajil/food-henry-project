import { useEffect, useState } from 'react';
import axios from "axios"
import style from './Detail.module.css'
import { Link, useParams } from "react-router-dom";


export default function () {
    const { id } = useParams()
    const [recipe, setRecipe] = useState({})

    useEffect(() => {
        const url = `http://localhost:3001/recipes/${id}`
        axios.get(url)
            .then(({ data: { data : recipe } }) => { setRecipe(() => recipe);
            console.log(recipe);
            })
            .catch((error) => { console.log(error.message); })
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
                {/* <p>Steps: {recipe.steps.join(', ')}</p> */}
            </div>
            : <p>Loading recipe ...</p>}
    </div>
}
import Card, { } from '../Card/Card'
import style from './Cards.module.css'



export default function (props) {
    return <div className={style.container}>
        {props.recipes.map((recipe) => (
            <Card
                key={recipe.id}
                name={recipe.name}
                image={recipe.image}
                diets={recipe.diets.toString()}
            />
        ))}
    </div>
}

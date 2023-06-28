import { Link } from "react-router-dom";
import style from './Card.module.css'
import { capitalizeFirstLetter } from '../../utils/utils'


export default function ({ id, name, image, diets }) {
    return (<>{id ?
        <div className={style.container}>
            <Link to={`/detail/${id}`}>
                <h3>{capitalizeFirstLetter(name)}</h3>
            </Link>
            <img src={image} alt={name} />
            <p>Diets: <em>{diets?.join(', ')}</em></p>
        </div>
        : <p>Loading recipe ...</p>}
    </>)
}
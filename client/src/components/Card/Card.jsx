import { Link } from "react-router-dom";
import style from './Card.module.css'
import utils from '../../utils/utils'


export default function ({ id, name, image, diets }) {
    return <>
        {id
            ? <div className={style.container}>
                <Link to={`/detail/${id}`}>
                    <h3>{utils.capitalizeFirstLetter(name)}</h3>
                </Link>
                <img src={image} alt={name} />
                <p>Diets: <em>{diets.join(', ')}</em></p>
            </div>
            : <p>Loading recipe ...</p>
        }
    </>
}
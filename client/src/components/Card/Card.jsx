import { Link } from "react-router-dom";
import style from './Card.module.css'
import utils from '../../utils/utils'


export default function (props) {
    const { id, name, image, diets } = props;
    return <div className={style.container}>
        <Link to={`/detail/${id}`}>
            <h3>{utils.capitalizeFirstLetter(name)}</h3>
        </Link>
        <img src={image} alt={props.name} />
        <p>{diets.join(', ')}</p>
    </div>
}
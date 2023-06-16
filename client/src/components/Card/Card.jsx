import style from './Card.module.css'


export default function (props) {
    return <div className={style.container}>
        <h3>{props.name}</h3>
        <p>{props.diets}</p>
        <img src={props.image} alt={props.name} />
    </div>
}
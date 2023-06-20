import style from './Landing.module.css'
import { Link } from "react-router-dom";


export default function () {
    return <div className={style.container}>
        <h1>My Landing Page</h1>
        <Link to={'/home'}>
            <button>Home page</button>
        </Link>
    </div>
}
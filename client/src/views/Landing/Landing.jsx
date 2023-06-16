import { Link } from "react-router-dom";


export default function () {
    return <div>
        <h1>Landing page</h1>
        <Link to={'/home'}>
            <button>Home page</button>
        </Link>
    </div>
}
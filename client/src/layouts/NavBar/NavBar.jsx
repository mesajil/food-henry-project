import { Link } from "react-router-dom";
import style from './NavBar.module.css'
import SearchBar, { } from '../SearchBar/SearchBar'
import SocialMedia, { } from '../SocialMedia/SocialMedia'
import LandingBtn, { } from '../LandingBtn/LandingBtn'

export default function () {
    return <div className={style.container}>
        <LandingBtn></LandingBtn>
        <SearchBar></SearchBar>
        <Link to='/form'>
            <button className={style.option}>Create new recipe</button>
        </Link>
        <SocialMedia></SocialMedia>
    </div>
}
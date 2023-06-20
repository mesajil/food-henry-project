import style from './NavBar.module.css'
import SearchBar, { } from '../SearchBar/SearchBar'
import SocialMedia, { } from '../SocialMedia/SocialMedia'
import LandingBtn, { } from '../LandingBtn/LandingBtn'

export default function () {
    return <div className={style.container}>
        <LandingBtn></LandingBtn>
        <SearchBar></SearchBar>
        <button className={style.option}>Create new recipe</button>
        <SocialMedia></SocialMedia>
    </div>
}
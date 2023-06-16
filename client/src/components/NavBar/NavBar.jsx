import SearchBar, {} from '../SearchBar/SearchBar'
import style from './NavBar.module.css'

export default function () {
    return <div className={style.container}>
        <SearchBar></SearchBar>
    </div>
}
import { connect } from "react-redux"
import style from './PageBar.module.css'

const PageBar = ({ onPageSelection, recipesLength, page }) => {
    const numberOfPages = Math.floor(recipesLength / 9 + 1)
    const pageSelectionHandler = (buttonText) => { onPageSelection(() => Number(buttonText)) }
    const prevPageHandler = () => { onPageSelection(() => page > 1 ? page - 1 : page) }
    const nextPageHandler = () => { onPageSelection(() => page < numberOfPages ? page + 1 : page) }

    return <div className={style.container}>
        <button onClick={prevPageHandler}>{"<"}</button>
        {[...Array(numberOfPages).keys()].map((key) => (
            <button className={page === key + 1 ? style.current : null} key={key}
                onClick={() => pageSelectionHandler(key + 1)}>{key + 1}
            </button>
        ))}
        <button onClick={nextPageHandler}>{">"}</button>
    </div>
}


const mapStateToProps = (state) => ({
    recipesLength: state.filter.length,
})

// Connect and export component
export default connect(mapStateToProps, null)(PageBar);

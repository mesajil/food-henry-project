import { connect } from "react-redux"
import Card, { } from '../Card/Card'
import style from './Cards.module.css'
import { useState } from "react"


const Cards = ({ recipes, page }) => {

    return <div className={style.container}>
        {recipes.length
            ? recipes
                .filter((_, index) => Math.floor(index/9) + 1 === page)
                .map((recipe) => {
                    const { id, name, image, diets } = recipe;
                    return <Card
                        key={id}
                        id={id}
                        name={name}
                        image={image}
                        diets={diets}
                    />
                })
            : <p>Loading recipes ...</p>
        }
    </div>
}


const mapStateToProps = (state) => ({
    recipes: state.filter,
})

// Connect and export component
export default connect(mapStateToProps, null)(Cards);
import { connect } from "react-redux"
import { addRecipes } from "../../redux/actions"
import { useEffect, useState } from "react";
import axios from "axios"
import Cards, { } from "../../components/Cards/Cards";
import NavBar, {} from "../../components/NavBar/NavBar"
import db from '../../db'

const Home = (props) => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        // REDUX
        // axios("localhost:3001/recipes/?name=red")
        //     .then(({ data: recipes }) => props.addRecipes(recipes))
        //     .catch(({ data: error }) => { console.log(error); })

        // Local state
        // axios("http://localhost:3001/recipes/?name=red")
        //     .then(({ data: { data: recipes } }) => setRecipes(recipes))
        //     .catch(error => { console.log('Error fetching recipes:', error.message); })
        setRecipes(db.recipes)

    }, [])
    return <div>
        <NavBar></NavBar>
        <Cards recipes={recipes}></Cards>
    </div>
}

// Redux configuration
const mapStateToProps = (state) => ({
    recipes: state.recipes,
})
const mapDispatchToProps = (dispatch) => ({
    addRecipes: (recipe) => dispatch(addRecipes(recipe)),
})

// Connect and export component
export default connect(mapStateToProps, mapDispatchToProps)(Home);
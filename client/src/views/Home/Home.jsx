import { connect } from "react-redux"
import { useEffect, useState } from "react";
import Cards, { } from "../../components/Cards/Cards";
import NavBar, { } from "../../layouts/NavBar/NavBar"
import SideBar, { } from "../../layouts/SideBar/SideBar"
import PageBar, { } from '../../layouts/PageBar/PageBar'
import { getRecipes } from "../../redux/actions"

const Home = ({ getRecipes, recipes, filter }) => {

    const [page, setPage] = useState(1)

    useEffect(() => { if (!recipes.length) getRecipes() }, [])
    useEffect(() => setPage(() => 1), [filter])

    return <div>
        <NavBar></NavBar>
        <SideBar></SideBar>
        <PageBar onPageSelection={setPage} page={page}></PageBar>
        <Cards page={page}></Cards>
        <PageBar onPageSelection={setPage} page={page}></PageBar>
    </div>
}

// Redux configuration
const mapStateToProps = (state) => ({
    filter: state.filter,
    recipes: state.filter,
})

const mapDispatchToProps = (dispatch) => ({
    getRecipes: (name) => dispatch(getRecipes(name)),
})

// Connect and export component
export default connect(mapStateToProps, mapDispatchToProps)(Home);
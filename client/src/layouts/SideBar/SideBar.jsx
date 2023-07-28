import { connect } from "react-redux"
import style from './SideBar.module.css'
import { filterByFilterObject } from "../../redux/actions"
import { useEffect, useState } from "react"

const SideBar = ({ diets, filterByFilterObject }) => {
    const [filterObject, setFilterObject] = useState({
        type: 'all',
        dataSource: 'all',
        filterByHealthScore: { min: 0, max: 100 },
        sorting: { name: 'sortByName', value: 'default' }
    })

    const filterHandler = (event) => {
        setFilterObject((filterObject) => {
            const { id, name, value } = event.target;
            if (id !== 'sorting')
                return { ...filterObject, [name]: value }
            else
                return { ...filterObject, sorting: { name, value } }
        })
    }

    useEffect(() => {
        filterByFilterObject(filterObject)
    }, [filterObject]);


    return <div className={style.container}>
        <div className={style.filter} onChange={filterHandler} >
            <h4>Select a type of diet: </h4>
            <select name="type" id="filter">
                <option value="all">All diet types</option>
                {diets.map(({ id, name }) => (
                    <option key={id} value={name}>{name}</option>
                ))}
            </select>
        </div>
        <div className={style.filter} onChange={filterHandler} >
            <h4>Select the data source: </h4>
            <select name="dataSource" id="filter">
                <option value="all">All data sources</option>
                <option value="api">API</option>
                <option value="database">Database</option>
            </select>
        </div>
        <div className={style.filter}>
            <h4>Filter by health score: </h4>
            <div class="min-max-slider">
                <label for="min">Minimum price</label>
                <input id="min" class="min" name="min" type="range" step="1" min="0" max="3000" />
                <label for="max">Maximum price</label>
                <input id="max" class="max" name="max" type="range" step="1" min="0" max="3000" />
            </div>
        </div>
        <div className={style.filter}>
            <h4>Sort by name: </h4>
            <select name="sortByName" id="sorting" onChange={filterHandler}>
                <option value="default">Default</option>
                <option value="A">Ascending</option>
                <option value="D">Descending</option>
            </select>
        </div>
        <div className={style.filter}>
            <h4>Sort by health score: </h4>
            <select name="sortByHealthScore" id="sorting" onChange={filterHandler}>
                <option value="default">Default</option>
                <option value="A">Ascending</option>
                <option value="D">Descending</option>
            </select>
        </div>
    </div>
}

const mapStateToProps = (state) => ({
    diets: state.diets,
})

const mapDispatchToProps = (dispatch) => ({
    filterByFilterObject: (diet) => dispatch(filterByFilterObject(diet)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
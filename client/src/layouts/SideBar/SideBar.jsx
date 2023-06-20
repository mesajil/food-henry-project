import { connect } from "react-redux"
import { diets } from '../../utils/db'
import style from './SideBar.module.css'
import { filterByFilterObject } from "../../redux/actions"
import { useEffect, useState } from "react"

const SideBar = ({ filterByFilterObject }) => {
    const [filterObject, setFilterObject] = useState({
        type: 'all',
        dataSource: 'all',
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

const mapDispatchToProps = (dispatch) => ({
    filterByFilterObject: (diet) => dispatch(filterByFilterObject(diet)),
})

export default connect(null, mapDispatchToProps)(SideBar);
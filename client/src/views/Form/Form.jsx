import { connect } from "react-redux"
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import style from './Form.module.css'
import { createRecipe, getDiets } from '../../redux/actions'

const Form = ({ diets, createRecipe, getDiets }) => {
    const [formData, setFormData] = useState({
        name: "",
        image: "",
        summary: "",
        healthScore: "50",
        steps: [],
        diets: [],
    })

    useEffect(() => { getDiets(); }, [])

    const handleChangeFormData = (event) => {
        const { name, value } = event.target;
        setFormData((formData) => ({ ...formData, [name]: value, }))
    }

    const handleChangeDietsSelection = (event) => {
        const { value, checked } = event.target;
        const { diets } = formData;
        if (checked) {
            if (!diets.includes(value))
                setFormData((formData) => ({ ...formData, diets: diets.concat(value) }))
        }
        else {
            setFormData((formData) => ({ ...formData, diets: diets.filter((diet) => diet != value) }))
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        createRecipe(formData)
    }

    return <div className={style.container}>
        <Link to={'/home'}>
            <button>Go back</button>
        </Link>
        <h1>Create a new recipe</h1>
        <form onSubmit={handleSubmit}>
            <div className={style.inputContainer}>
                <label htmlFor="">Name: </label>
                <input type="text" name='name' value={formData.name} onChange={handleChangeFormData} />
            </div>
            <div className={style.inputContainer}>
                <label htmlFor="">Summary: </label>
                <input type="text" name='summary' value={formData.summary} onChange={handleChangeFormData} />
            </div>
            <div className={style.inputContainer}>
                <label htmlFor="">Image: </label>
                <select name="image" id="" onChange={handleChangeFormData} >
                    <option value="">null</option>
                    <option value="https://spoonacular.com/recipeImages/782601-312x231.jpg">https://spoonacular.com/recipeImages/782601-312x231.jpg</option>
                </select>
            </div>
            <div className={style.inputContainer}>
                <label htmlFor="">Health score: </label>
                <input type="range" name='healthScore' onChange={handleChangeFormData} min="0" max="100" value={formData.healthScore} />
            </div>
            <div className={style.inputContainer}>
                <label htmlFor="">Select diets: </label>
                <ul className={style.listItems}>
                    {diets.map(({ id, name }) =>
                        <div key={id} className={style.item}>
                            <input type="checkbox" className={style.checkbox} value={id} onChange={handleChangeDietsSelection}
                            />
                            <li className={style.itemText}>{name}</li>
                        </div>
                    )}
                </ul>
            </div>
            <button type="submit">Create recipe</button>
        </form>
    </div>
}

const mapStateToProps = (state) => ({
    diets: state.diets,
})

const mapDispatchToProps = (dispatch) => ({
    createRecipe: (diet) => dispatch(createRecipe(diet)),
    getDiets: (diet) => dispatch(getDiets(diet)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Form);
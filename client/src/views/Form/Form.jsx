import { connect } from "react-redux"
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import style from './Form.module.css'
import { createRecipe, getDiets } from '../../redux/actions'
import InstructionInput from '../../components/Form/InstructionInput/InstructionInput'
import createInstruction from '../../utils/Form/utils/createInstruction'
import useFormErrors from "../../hooks/useFormErrors";
import { validators } from "../../utils/Form/validations/validations";

const Form = ({ diets, createRecipe, getDiets }) => {
    const [formData, setFormData] = useState({
        name: "",
        image: "",
        summary: "",
        healthScore: "50",
        diets: [],
        steps: [],
    })
    const { setError, clearError, getError, hasErrors } = useFormErrors()

    useEffect(() => { getDiets(); }, [])

    const handleReplaceFormData = (event) => {
        const { name, value } = event.target;
        setFormData((formData) => ({ ...formData, [name]: value, }))
        const { data: isValid, message: errorMessage } = validators[name](formData[name])
        !isValid ? setError(name, errorMessage) : clearError(name)
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
        const name = 'diets'
        const { data: isValid, message: errorMessage } = validators[name](formData[name])
        !isValid ? setError(name, errorMessage) : clearError(name)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        createRecipe(formData)
    }
    const handleCreateInstruction = () => {
        createInstruction(formData, setFormData)
        const name = 'steps'
        const { data: isValid, message: errorMessage } = validators[name](formData[name])
        !isValid ? setError(name, errorMessage) : clearError(name)
    }

    return <div className={style.container}>
        <Link to={'/home'}>
            <button>Go back</button>
        </Link>
        <h1>Create a new recipe</h1>
        <form onSubmit={handleSubmit}>
            <div className={style.inputContainer}>
                <label htmlFor="">Name: </label>
                <input type="text" name='name' value={formData.name} onChange={handleReplaceFormData} />
                <p>{getError('name')}</p>
            </div>
            <div className={style.inputContainer}>
                <label htmlFor="">Summary: </label>
                <input type="text" name='summary' value={formData.summary} onChange={handleReplaceFormData} />
                <p>{getError('summary')}</p>
            </div>
            <div className={style.inputContainer}>
                <label htmlFor="">Image: </label>
                <select name="image" id="" onChange={handleReplaceFormData} >
                    <option value="">null</option>
                    <option value="https://spoonacular.com/recipeImages/782601-312x231.jpg">https://spoonacular.com/recipeImages/782601-312x231.jpg</option>
                </select>
                <p>{getError('image')}</p>
            </div>
            <div className={style.inputContainer}>
                <label htmlFor="">Health score: </label>
                <input type="range" name='healthScore' onChange={handleReplaceFormData} min="0" max="100" value={formData.healthScore} />
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
                <p>{getError('diets')}</p>
            </div>
            <button type="button"
                onClick={handleCreateInstruction}>
                Create instruction
            </button>
            <div>
                {formData.steps.map((step, index) =>
                    <InstructionInput
                        key={index} index={index}
                        formData={formData}
                        setFormData={setFormData}
                    />
                )}
                <p>{getError('steps')}</p>
            </div>
            <button type="submit"
                disabled={hasErrors()}>
                Create recipe
            </button>
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
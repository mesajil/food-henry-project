import removeStep from '../../../utils/Form/utils/removeStep'

const StepInput = ({ indexStep, indexInstruction, formData, setFormData }) => {

    const handleUpdateStepName = (event) => {
        const { value } = event.target;
        const newFormData = { ...formData }
        newFormData.steps[indexInstruction].steps[indexStep].step = value
        setFormData(newFormData)
    }

    const { step } = formData.steps[indexInstruction].steps[indexStep];
    return (<div>
        <label htmlFor="">Step description: </label>
        <input type="text" name='name'
            value={step}
            onChange={handleUpdateStepName}
        />
        <button type="button"
            onClick={() => removeStep(indexStep, indexInstruction, formData, setFormData)}>
            Remove step
        </button>
    </div>)
}


export default StepInput;

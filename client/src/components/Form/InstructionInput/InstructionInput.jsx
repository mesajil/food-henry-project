import StepInput from '../StepInput/StepInput'
import removeInstruction from '../../../utils/Form/utils/removeInstruction'

const InstructionInput = ({ index, formData, setFormData }) => {

    const handleUpdateInstructionName = (event) => {
        const { value } = event.target;
        const newFormData = { ...formData }
        newFormData.steps[index].name = value
        setFormData(newFormData)
    }

    const handleUpdateInstructionSteps = () => {
        const number = formData.steps[index].steps.length + 1;
        const step = { number, step: "", ingredients: [], equipment: [] }
        let newFormData = { ...formData }
        newFormData.steps[index].steps.push(step)
        setFormData(newFormData)
    }

    const { name, steps } = formData.steps[index];
    return (<div>
        <div>
            <label htmlFor="">Instruction's name: </label>
            <input type="text" name='name'
                value={name}
                onChange={handleUpdateInstructionName}
            />
            <button type="button" name='createStepBtn'
                onClick={handleUpdateInstructionSteps}>
                New step
            </button>
            <button type="button" name=''
            onClick={() => removeInstruction(index, formData, setFormData)}>
                Remove Instruction
            </button>
            <div>
                {steps.map((step, indexStep) => <StepInput
                    key={indexStep}
                    indexStep={indexStep} indexInstruction={index}
                    formData={formData}
                    setFormData={setFormData}
                />)}
            </div>
        </div>
    </div>)
}

export default InstructionInput;
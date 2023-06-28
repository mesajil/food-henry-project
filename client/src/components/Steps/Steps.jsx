import Ingredients from '../Ingredients/Ingredients'
import Equipment from '../Equipment/Equipment'
import { isEmptyArray } from '../../utils/utils'

const Steps = ({ steps }) => {

    return (<div>
        {steps.map((step, index) =>
            <div key={index}>
                <p>{step.number}. {step.step}</p>
                {!isEmptyArray(step.ingredients) &&
                    <Ingredients ingredients={step.ingredients} />}
                {!isEmptyArray(step.equipment) &&
                    <Equipment equipment={step.equipment} />}
            </div>)}
    </div>)
}


export default Steps;
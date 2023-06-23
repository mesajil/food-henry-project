import Ingredients from '../Ingredients/Ingredients'
import Equipment from '../Equipment/Equipment'

const Steps = ({ steps }) => {

    return (<div>
        {steps.map((step, index) =>
            <div key={index}>
                <p>{step.number}. {step.step}</p>
                {step.ingredients
                    && <Ingredients ingredients={step.ingredients} />}
                {step.equipment
                    && <Equipment equipment={step.equipment} />}
            </div>)}
    </div>)
}


export default Steps;
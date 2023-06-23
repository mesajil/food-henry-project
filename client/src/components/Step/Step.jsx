



const Step = ({ step }) => {
    return <div>
        {steps.map(step => <div>
            <h5>{step.number}</h5>
            <p>{step.step}</p>
        </div>)}
    </div>
}


export default Step;
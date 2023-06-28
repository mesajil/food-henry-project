const removeStep = (indexStep, indexInstruction, formData, setFormData) => {
    let newFormData = { ...formData }
    let steps = newFormData.steps[indexInstruction].steps;
    steps.splice(indexStep, 1)
    steps = steps.map((step, index) => ({ ...step, number: index + 1 }))
    newFormData.steps[indexInstruction].steps = steps;
    setFormData(newFormData)
}




export default removeStep;
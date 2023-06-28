


const createInstruction = (formData, setFormData) => {
    const steps = formData.steps.concat({ name: "", steps: [] })
    setFormData((formData) => ({ ...formData, steps }))
}




export default createInstruction;
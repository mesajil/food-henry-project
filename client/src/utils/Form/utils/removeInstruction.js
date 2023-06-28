const removeInstruction = (index, formData, setFormData) => {
    let newFormData = {...formData}
    newFormData.steps.splice(index, 1)
    setFormData(newFormData)
}




export default removeInstruction;
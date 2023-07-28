import { useState } from "react"



const useFormErrors = () => {
    const [errors, setErrors] = useState({})

    const setError = (fieldName, errorMessage) => {
        const updateErrors = {...errors};
        updateErrors[fieldName] = errorMessage;
        setErrors(updateErrors)
        return updateErrors; // Trick 
    }
    
    const clearError = (fieldName) => {
        const updateErrors = {...errors};
        delete updateErrors[fieldName];
        setErrors(updateErrors)
        return updateErrors; // Trick 
    }

    const getError = (fieldName) => errors[fieldName];
    const hasErrors = () => Object.keys(errors).length > 0;
    
    return {
        errors,
        setErrors,
        setError,
        clearError,
        getError,
        hasErrors,
    }
}


export default useFormErrors;
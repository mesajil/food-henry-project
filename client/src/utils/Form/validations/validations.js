

const validateName = (name) => {
    const errorMessage = `Name is required`
    const validName = name.trim() !== ''
    return { data: validName, message: errorMessage }
}

const validateSummary = (summary) => {
    const errorMessage = `Summary is required`
    const validSummary = summary.trim() !== ''
    return { data: validSummary, message: errorMessage }
}

const validateImage = (imageUrl) => {
    const pattern = /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g;
    const errorMessage = `Image must an valid url`
    const validImage = pattern.test(imageUrl)
    return { data: validImage, message: errorMessage }
}

const validateHealthScore = (healthScore) => {
    const errorMessage = `healthScore must be a number between 0 and 100`
    const validHealthScore = Number.isInteger(healthScore) && healthScore >= 0 && healthScore <= 100;
    return { data: validHealthScore, message: errorMessage }
}

const validateDiets = (diets) => {
    const errorMessage = `Select one or more diets`
    const validDiets = diets.length > 0;
    return { data: validDiets, message: errorMessage }
}

const validateSteps = (steps) => {
    const errorMessage = `Enter one or more instructions`
    const validSteps = steps.length > 0;
    return { data: validSteps, message: errorMessage }
}

const validators = {
    name: validateName,
    summary: validateSummary,
    image: validateImage,
    healthScore: validateHealthScore,
    diets: validateDiets,
    steps: validateSteps,
}

export {
    validators,
    validateName,
    validateSummary,
    validateImage,
}
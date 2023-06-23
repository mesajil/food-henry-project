const Ingredient = ({ ingredient }) => {
    return (<div>
        {ingredient &&
            <p>{ingredient.id}. {ingredient.name}</p>}
    </div>)
}

export default Ingredient;
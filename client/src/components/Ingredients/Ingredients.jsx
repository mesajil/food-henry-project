import Ingredient from "../Ingredient/Ingredient";


const Ingredients = ({ ingredients }) => {
    return (<div>
        {ingredients
        && <div>
            <p>Ingredients:</p>
            {ingredients.map((ingredient, index) =>
                <Ingredient key={index} ingredient={ingredient}
                />)}
        </div>}
    </div>)
}

export default Ingredients;
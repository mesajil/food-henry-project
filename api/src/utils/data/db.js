// Diets
const diets = [
    { "id": 1, "name": "gluten free" },
    { "id": 2, "name": "dairy free" },
    { "id": 3, "name": "lacto ovo vegetarian" },
    { "id": 4, "name": "vegan" },
    { "id": 5, "name": "paleolithic" },
    { "id": 6, "name": "primal" },
    { "id": 7, "name": "whole 30" },
    { "id": 8, "name": "pescatarian" },
    { "id": 9, "name": "ketogenic" },
    { "id": 10, "name": "fodmap friendly" }
]

// Recipe data
titleWords = ['pizza', 'red', 'summer', 'seafood', 'burger', 'steak', 'fried', 'chicken']
image = 'https://spoonacular.com/recipeImages/782601-312x231.jpg'
summaries = [
    "Obviously roasting a block of feta with bursting tomatoes is going to be amazing. But is it good enough to break TikTok like this one did? Our answer, begrudgingly, is yes. It's genius—super-easy, but fancy enough for date night.",
    "Hearty and flavorful, this only requires 5 ingredients (and one of them is BACON!). We bet this simple recipe helped convert even the most ardent of cabbage haters last year.",
    "When it comes to chicken breast recipes, it's hard to beat this one. The sauce is full of garlic, tomatoes, and most importantly, cream. It's bright and easy and is a great dinner for when you wanted comfort food and to impress a dinner guest in 2022.",
]

// Customize functions
const shuffle = (array) => array.sort(() => Math.random() - 0.5);
const randomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Create recipes

const recipes = [...Array(100).keys()].map((key) => ({
    id: key + 1,
    name: shuffle(titleWords).slice(0, randomInteger(2, Math.floor(titleWords.length / 2))).join(' '),
    image,
    summary: summaries[randomInteger(0, summaries.length - 1)],
    healthScore: randomInteger(0, 100),
    steps: [...Array(randomInteger(0, 7)).keys()].map((key) => ({
        number: key + 1,
        step: `This is the step ${key + 1}`
    })),
    diets: shuffle(diets).slice(0, randomInteger(1, diets.length)).map(({ name }) => name),
    created: false
}))


module.exports = { recipes, diets };


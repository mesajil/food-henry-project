require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');


// Connection to the database
const {
  DB_USER, DB_PASSWORD, DB_HOST, PORT, DB_NAME,
} = process.env;

const sequelize = new Sequelize(
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  {
    host: DB_HOST,
    port: PORT,
    dialect: 'postgres',
    logging: false,
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);



// Read models from models file

const basename = path.basename(__filename);
const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (
    // Read only files of type Model.js
    file.indexOf('.') !== 0) &&
    (file !== basename) &&
    (file.slice(-3) === '.js'
    ))
  .forEach((file) => {
    // Add model to modelDefiners
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Make the sequelize connection to all models
modelDefiners.forEach(model => model(sequelize));

// Capitalize all names of the models, ie: product => Product

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) =>
  [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]
);
sequelize.models = Object.fromEntries(capsEntries);


// Associations

const { Recipe, Diet } = sequelize.models;
Recipe.belongsToMany(Diet, { through: 'recipe_diet' })
Diet.belongsToMany(Recipe, { through: 'recipe_diet' })


// Exports
module.exports = {
  ...sequelize.models, // Export all models
  conn: sequelize,     // Export the connection to the database
};

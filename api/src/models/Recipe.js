const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'recipe',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "The recipe name must not be void."
          }
        }
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: {
            msg: "The image of the recipe must be an URL."
          }
        }
      },
      summary: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      healthScore: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: "The heath score must be an integer number."
          }
        }
      },
      steps: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        allowNull: false,
        validate: {
          isValidJsonArray(steps) {
            // Validate Array type
            if (!Array.isArray(steps))
              throw new Error('Steps must be an array')

            // Validate each step
            for (const step of steps) {
              // Validate JSON object
              if (typeof step !== 'object' || Array.isArray(step))
                throw new Error('Each step must be a JSON object.');

              // Validate number and step attributes
              const { number, step: stepDesc } = step;
              if (!number)
                throw new Error('Each step must have an id')
              if (!stepDesc)
                throw new Error('Each step description must not be null and void')
            }
          }
        }
      },
    });
};

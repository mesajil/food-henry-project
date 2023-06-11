const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'recipe',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
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
        defaultValue: "",
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
        defaultValue: [],
        validate: {
          isArray(steps) {
            if (!Array.isArray(steps))
              throw new Error('Steps must be an array')
          },
        }
      },
    });
};

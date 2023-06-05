const { DataTypes } = require('sequelize');
// Export the function that define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  sequelize.define(
    'recipe',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
};

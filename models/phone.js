'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class phone extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  phone.init(
    {
      brand: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      model: DataTypes.STRING,
      price: DataTypes.DECIMAL,
      color: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'phone',
      tableName: 'phones',
      underscored: true,
    }
  );
  return phone;
};

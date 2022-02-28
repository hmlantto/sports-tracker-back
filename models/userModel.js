const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../database/db')

class User extends Model {}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      len: [3,30]
    }
  },
  name: {
    type: DataTypes.STRING
  },
  password_hash: {
    type: DataTypes.STRING,
    allowNull: false
  },
  activated: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'user',
  tableName: 'users'
})

module.exports = User
const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../database/db')

class WorkoutType extends Model {}

WorkoutType.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'workout_type',
  tableName: 'workout_types'
})

module.exports = WorkoutType
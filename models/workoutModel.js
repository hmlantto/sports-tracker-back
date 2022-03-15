const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../database/db')

class Workout extends Model {}

Workout.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'users', key: 'id' },
  },
  category_id: {
    type: DataTypes.INTEGER,
    references: { model: 'categories', key: 'id' },
  },
  duration_mins: {
    type: DataTypes.INTEGER
  },
  notes: {
    type: DataTypes.STRING
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'workout',
  tableName: 'workouts'
})

module.exports = Workout
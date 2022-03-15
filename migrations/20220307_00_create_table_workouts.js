const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('workouts', {
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
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('workouts')
  }
}
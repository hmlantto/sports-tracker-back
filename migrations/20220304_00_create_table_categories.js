const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('categories', {
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
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      }
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('categories')
  }
}
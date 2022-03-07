const User = require( './userModel' )
const Session = require( './sessionModel' )
const Category = require( './categoryModel' )

User.hasOne( Session )
Session.belongsTo( User )

User.hasMany( Category )
Category.belongsTo( User )

module.exports = {
  User, Session, Category
}
const User = require( './userModel' )
const Session = require( './sessionModel' )
const Category = require( './categoryModel' )
const Workout = require( './workoutModel' )
const WorkoutType = require( './workoutTypeModel' )

User.hasOne( Session )
Session.belongsTo( User )

User.hasMany( Category )
Category.belongsTo( User )

User.hasMany( Workout )
Workout.belongsTo( User )

Category.hasMany( Workout )
Workout.belongsTo( Category )

module.exports = {
  User, Session, Category, Workout, WorkoutType
}
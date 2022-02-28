const User = require('./userModel')
const Session = require('./sessionModel')

User.hasOne(Session)
Session.belongsTo(User)

module.exports = {
  User, Session
}
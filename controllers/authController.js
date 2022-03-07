const jwt = require('jsonwebtoken')
const bcrypt = require( 'bcrypt' )
const router = require('express').Router()
const { SECRET } = require('../utils/config')
const { tokenExtractor } = require('../utils/middleware')
const { Session, User } = require('../models/modelsIndex')

// ----------------
// LOGIN
// ----------------
router.post( '/login', async ( request, response ) => {
  const body = request.body

  const user = await User.findOne({
    where: {
      username: body.username
    }
  })

  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare( body.password, user.password_hash )

  if ( !user || passwordCorrect === false || user.activated === false ) {
    return response.status(401).json({
      error: 'Invalid username or password.'
    })
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  }

  const token = jwt.sign(userForToken, SECRET)
  
  const newSession = {
    user_id: user.id,
    token: token
  }

  await Session.create(newSession)

  response
    .status(200)
    .send({ token, username: user.username, name: user.name, id: user.id })
})

// ----------------
// LOGOUT
// ----------------
router.delete( '/logout', tokenExtractor, async ( request, response ) => {
  await Session.destroy({
    where: {
      user_id: request.decodedToken.id
    }
  })

  response.status(204).end()
})

module.exports = router
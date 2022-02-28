const bcrypt = require( 'bcrypt' )
const router = require('express').Router()
const { User } = require('../models/modelsIndex')

// ----------------
// FIND USER BY ID
// ----------------
router.get( '/:id', async ( request, response ) => {
  const result = await User.findByPk( request.params.id )
  const user = result.toJSON()
  delete user.password_hash
  response.json( user )
})

// ----------------
// CREATE NEW USER
// ----------------
router.post( '/', async ( request, response ) => {
  const body = request.body

  if ( body.username === undefined || body.username.length < 3 ) {
    return response.status( 400 ).json({
      error: 'Username must be at least 3 characters long'
    })
  }

  if ( body.password === undefined || body.password.length < 8 ) {
    return response.status( 400 ).json({
      error: 'Password must be at least 8 characters long'
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash( body.password, saltRounds )

  const newUser = {
    username: body.username,
    name: body.name,
    password_hash: passwordHash,
  }

  const result = await User.create( newUser )
  const createdUser = result.toJSON()
  delete createdUser.password_hash
  response.status( 201 ).json( createdUser )
})

module.exports = router
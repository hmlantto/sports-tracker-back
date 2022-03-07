const express = require( 'express' )
require('express-async-errors')
const app = express()
const cors = require( 'cors' )
const { connectToDatabase } = require('./database/db')
const usersRouter = require( './controllers/usersController' )
const authRouter = require( './controllers/authController' )
const categoriesRouter = require( './controllers/categoriesController' )

connectToDatabase()

app.use( cors() )
app.use(express.json())

app.use( '/api/users', usersRouter )
app.use( '/api/auth', authRouter )
app.use( '/api/categories', categoriesRouter )

module.exports = app
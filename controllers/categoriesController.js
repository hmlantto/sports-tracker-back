const router = require('express').Router()
const { tokenExtractor } = require('../utils/middleware')
const { Category } = require('../models/modelsIndex')

// ----------------
// CREATE NEW CATEGORY
// ----------------
router.post( '/', tokenExtractor, async ( request, response ) => {
  const body = request.body

  if ( !body.name ) {
    return response.status( 400 ).json({
      error: 'Category name required'
    })
  }

  const newCategory = {
    user_id: request.decodedToken.id,
    name: body.name
  }

  const result = await Category.create( newCategory )
  response.status( 201 ).json( result )
})

// ---------------------
// GET USER'S CATEGORIES
// ---------------------
router.get( '/', tokenExtractor, async ( request, response ) => {
  const result = await Category.findAll({
    where: {
      user_id: request.decodedToken.id
    },
    order: [
      [ 'name', 'ASC' ]
    ]
  })
  response.status( 200 ).json( result )
})

module.exports = router
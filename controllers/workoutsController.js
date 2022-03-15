const router = require('express').Router()
const { tokenExtractor } = require('../utils/middleware')
const { Workout, WorkoutType } = require('../models/modelsIndex')

// ----------------
// ADD NEW WORKOUT
// ----------------
router.post( '/', tokenExtractor, async ( request, response ) => {
  const body = request.body

  const newWorkout = {
    user_id: request.decodedToken.id,
    category_id: body.category_id,
    duration_mins: body.duration_mins,
    notes: body.notes
  }

  const result = await Workout.create( newWorkout )
  response.status( 201 ).json( result )
})

// ---------------------
// GET WORKOUT TYPES
// ---------------------
router.get( '/types', async ( request, response ) => {
  const result = await WorkoutType.findAll({
    order: [
      [ 'id', 'ASC' ]
    ]
  })
  response.status( 200 ).json( result )
})

module.exports = router
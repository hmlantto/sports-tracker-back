const jwt = require('jsonwebtoken')
const { SECRET } = require('./config')
const { Session, User } = require('../models/modelsIndex')

const tokenExtractor = async ( request, response, next ) => {
  const authorization = request.get( 'authorization' )
  if ( authorization && authorization.toLowerCase().startsWith( 'bearer ' ) ) {
    try {
      const token = authorization.substring( 7 )
      request.decodedToken = jwt.verify( token, SECRET )

      const user = await User.findByPk( request.decodedToken.id )

      if ( user.activated === false ) {
        await Session.destroy({
          where: {
            user_id: request.decodedToken.id
          }
        })
        throw new Error()
        // return response.status(401).end({ error: 'Token invalid' })
      }
      
      const session = await Session.findAll({
        where: { token: token }
      })

      if ( session.length === 0 ) {
        throw new Error()
        // return response.status(401).json({ error: 'Token invalid' })
      }

    } catch ( error ){
      return response.status(401).json({ error: 'Token invalid' })
    }
  } else {
    return response.status(401).json({ error: 'Token missing' })
  }
  next()
}

module.exports = { tokenExtractor }
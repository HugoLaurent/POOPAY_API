// app/controllers/session_controller.ts

import User from '#models/user'
import { SessionValidator } from '#validators/session'
import { HttpContext } from '@adonisjs/core/http'

export default class SessionController {
  async store({ request, auth, response }: HttpContext) {
    const data = request.all()
    const payload = await SessionValidator.validate(data)
    console.log('Données validées:', payload)
    const { username, password } = payload
    try {
      const user = await User.verifyCredentials(username, password)
      const token = await auth.use('api').createToken(user, ['*'], {
        expiresIn: '30 days',
      })

      return {
        type: token.type,
        token: token.value!.release(),
        user: {
          id: user.id,
          pseudo: user.username,
        },
      }
    } catch (err) {
      return response.unauthorized({
        message: 'Identifiants invalides',
      })
    }
  }

  async show({ auth, response }: HttpContext) {
    const user = await auth.use('api').authenticate()
    if (!user) {
      return response.status(401).send({ message: 'Unauthorized' })
    }
    return response.status(200).send({ message: 'Authenticated' })
  }

  async destroy({ auth }: HttpContext) {
    await auth.use('api').invalidateToken()
    return { message: 'Déconnecté avec succès' }
  }
}

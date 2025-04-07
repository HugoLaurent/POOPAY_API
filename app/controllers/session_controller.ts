// app/controllers/session_controller.ts

import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'

export default class SessionController {
  async store({ request, auth, response }: HttpContext) {
    const { username, password } = request.only(['username', 'password'])
    console.log('username', username)

    try {
      const user = await User.verifyCredentials(username, password)
      const token = await auth.use('api').createToken(user, ['*'], {
        expiresIn: '30 days',
      })

      return {
        type: token.type,
        token: token.value!.release(), // IMPORTANT : .release() pour l'envoyer côté client
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

  async destroy({ auth }: HttpContext) {
    await auth.use('api').invalidateToken()
    return { message: 'Déconnecté avec succès' }
  }
}

import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  async index({ response }: HttpContext) {
    const user = await User.query()

    return response.json({
      user: user,
    })
  }
}

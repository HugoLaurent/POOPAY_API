// app/controllers/session_controller.ts

import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'

export default class CompteController {
  async show({ auth }: HttpContext) {
    const user = await User.findOrFail(auth.user!.id)
    return {
      username: user.username,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  }
}

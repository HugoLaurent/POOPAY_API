// app/controllers/session_controller.ts

import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'

export default class SignInController {
  async register({ request, response }: HttpContext) {
    const body = request.only([
      'username',
      'password',
      'age',
      'postalCode',
      'company',
      'monthlySalary',
      'monthlyHours',
      'sectorId',
      'statusId',
    ])

    try {
      await User.create(body)

      return response.ok({
        message: 'Compte créé avec succès',
      })
    } catch (err) {
      console.error('❌ Erreur création user :', err)

      return response.badRequest({
        message: 'Erreur lors de la création du compte',
      })
    }
  }
}

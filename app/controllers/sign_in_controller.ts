// app/controllers/session_controller.ts

import User from '#models/user'
import { SignUpValidator } from '#validators/sign_up'
import { HttpContext } from '@adonisjs/core/http'

export default class SignInController {
  async register({ request, response }: HttpContext) {
    const data = request.all()
    const payload = await SignUpValidator.validate(data)
    const { username, password, age, postalCode, monthlySalary, monthlyHours, sectorId, statusId } =
      payload

    try {
      await User.create({
        username,
        password,
        age,
        postalCode,
        monthlySalary,
        monthlyHours,
        sectorId,
        statusId,
      })

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

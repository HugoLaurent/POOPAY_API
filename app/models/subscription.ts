// app/Models/Subscription.ts

import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

import User from '#models/user'
import PaymentMethod from '#models/payment_method'

export default class Subscription extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column.dateTime()
  declare startDate: DateTime

  @column.dateTime()
  declare endDate: DateTime

  @column()
  declare isActive: boolean

  @column()
  declare paymentMethodId: number // Utiliser paymentMethodId pour la FK

  @column()
  declare stripeId: string | null

  // Spécifier explicitement les types de relation pour résoudre l'erreur
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @belongsTo(() => PaymentMethod)
  declare paymentMethod: BelongsTo<typeof PaymentMethod> // Mettre cette relation comme elle doit être

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}

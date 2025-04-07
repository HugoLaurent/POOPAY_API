// app/Models/PaymentMethod.ts

import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'

import Subscription from '#models/subscription'

export default class PaymentMethod extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string // Nom du mode de paiement (ex: "Stripe", "PayPal")

  @column()
  declare description: string | null // Description optionnelle du mode de paiement

  @hasMany(() => Subscription)
  declare subscriptions: HasMany<typeof Subscription> // Un mode de paiement peut avoir plusieurs abonnements

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}

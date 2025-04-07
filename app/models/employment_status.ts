// app/Models/EmploymentStatus.ts

import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'

import User from '#models/user'

export default class EmploymentStatus extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string // Le nom du statut professionnel (ex: "Salarié", "Cadre")

  @hasMany(() => User)
  declare users: HasMany<typeof User> // Un statut peut être associé à plusieurs utilisateurs

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}

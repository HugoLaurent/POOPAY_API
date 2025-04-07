// app/Models/SalaryRange.ts

import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'

import User from '#models/user'

export default class SalaryRange extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare label: string // ex: "2000-2500", "SMIC", etc.

  @column()
  declare minValue: number

  @column()
  declare maxValue: number | null // Si non limité, peut être NULL

  @hasMany(() => User)
  declare users: HasMany<typeof User> // Un salary range peut avoir plusieurs utilisateurs

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}

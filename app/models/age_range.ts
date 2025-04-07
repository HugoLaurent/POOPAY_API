// app/Models/AgeRange.ts

import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'

import User from '#models/user'

export default class AgeRange extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare label: string // ex: "18-25", "26-35", etc.

  @column()
  declare minAge: number

  @column()
  declare maxAge: number

  @hasMany(() => User)
  declare users: HasMany<typeof User> // Un age range peut avoir plusieurs utilisateurs

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}

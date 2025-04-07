// app/Models/Sector.ts

import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'

import User from '#models/user'

export default class Sector extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string // ex: "IT", "Healthcare", etc.

  @hasMany(() => User)
  declare users: HasMany<typeof User> // Un secteur peut avoir plusieurs utilisateurs

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}

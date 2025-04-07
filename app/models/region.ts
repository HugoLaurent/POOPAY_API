// app/Models/Region.ts

import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'

import User from '#models/user'

export default class Region extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare postalCode: string

  @column()
  declare regionName: string

  @column()
  declare departmentName: string | null

  @hasMany(() => User)
  declare users: HasMany<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}

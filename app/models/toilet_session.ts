import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, beforeSave } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from '#models/user'

export default class ToiletSession extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column.dateTime()
  declare startedAt: DateTime

  @column.dateTime()
  declare endedAt: DateTime

  @column()
  declare durationSeconds: number

  @column()
  declare earnedAmount: number

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeSave()
  static async calculateDuration(session: ToiletSession) {
    if (session.startedAt && session.endedAt && session.user) {
      const seconds = session.endedAt.diff(session.startedAt, 'seconds').seconds
      session.durationSeconds = Math.round(seconds)
      const hourlyRate = session.user.monthlySalary / session.user.monthlyHours
      session.earnedAmount = (session.durationSeconds / 3600) * hourlyRate
    }
  }
}

// app/Models/User.ts

import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, belongsTo, hasMany, beforeSave } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'

import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'

// Relations
import Sector from '#models/sector'
import EmploymentStatus from '#models/employment_status'
import SalaryRange from '#models/salary_range'
import AgeRange from '#models/age_range'
import ToiletSession from '#models/toilet_session'
import GroupMember from '#models/group_member'
import Subscription from '#models/subscription'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['username'], // ← use pseudo instead of email
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare username: string // ← pseudo, unique!

  @column({ serializeAs: null })
  declare password: string

  // 🧻 Extra user data

  @column()
  declare age: number

  @column()
  declare company: string | null

  @column()
  declare postalCode: string

  @column()
  declare monthlySalary: number

  @column()
  declare monthlyHours: number

  @column()
  declare hourlyRate: number

  @column()
  declare sectorId: number

  @column()
  declare statusId: number

  @column()
  declare salaryRangeId: number // ← Ajouter la colonne salaryRangeId

  @column()
  declare ageRangeId: number // ← Ajouter la colonne ageRangeId

  @column({ columnName: 'employment_status_id' })
  declare employmentStatusId: number

  @column({ columnName: 'region_id' })
  declare regionId: number

  // 📎 Relations

  @belongsTo(() => Sector)
  declare sector: BelongsTo<typeof Sector>

  @belongsTo(() => EmploymentStatus, { foreignKey: 'statusId' })
  declare employmentStatus: BelongsTo<typeof EmploymentStatus>

  @belongsTo(() => SalaryRange) // ← Relation vers SalaryRange
  declare salaryRange: BelongsTo<typeof SalaryRange> // ← Relation SalaryRange

  @belongsTo(() => AgeRange) // ← Relation vers AgeRange
  declare ageRange: BelongsTo<typeof AgeRange> // ← Relation AgeRange

  @hasMany(() => ToiletSession)
  declare toiletSessions: HasMany<typeof ToiletSession>

  @hasMany(() => GroupMember)
  declare groups: HasMany<typeof GroupMember>

  @hasMany(() => Subscription)
  declare subscriptions: HasMany<typeof Subscription>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  static accessTokens = DbAccessTokensProvider.forModel(User)

  @beforeSave()
  static async calculateFields(user: User) {
    // Calculer le `hourlyRate`
    if (user.monthlySalary && user.monthlyHours) {
      user.hourlyRate = user.monthlySalary / user.monthlyHours
    }

    // Déterminer et attribuer `salaryRangeId` en fonction du `monthlySalary`
    if (user.monthlySalary <= 1500) {
      const salaryRange = await SalaryRange.query()
        .where('minValue', '<=', 1500)
        .andWhere('maxValue', '>=', 1500)
        .first()
      if (salaryRange) user.salaryRangeId = salaryRange.id
    } else if (user.monthlySalary <= 2500) {
      const salaryRange = await SalaryRange.query()
        .where('minValue', '<=', 2500)
        .andWhere('maxValue', '>=', 2500)
        .first()
      if (salaryRange) user.salaryRangeId = salaryRange.id
    } else if (user.monthlySalary <= 4000) {
      const salaryRange = await SalaryRange.query()
        .where('minValue', '<=', 4000)
        .andWhere('maxValue', '>=', 4000)
        .first()
      if (salaryRange) user.salaryRangeId = salaryRange.id
    } else {
      const salaryRange = await SalaryRange.query().where('minValue', '>=', 5000).first()
      if (salaryRange) user.salaryRangeId = salaryRange.id
    }

    // Déterminer et attribuer `ageRangeId` en fonction de `age`
    if (user.age >= 18 && user.age <= 25) {
      const ageRange = await AgeRange.query()
        .where('minAge', '<=', 25)
        .andWhere('maxAge', '>=', 18)
        .first()
      if (ageRange) user.ageRangeId = ageRange.id
    } else if (user.age >= 26 && user.age <= 35) {
      const ageRange = await AgeRange.query()
        .where('minAge', '<=', 35)
        .andWhere('maxAge', '>=', 26)
        .first()
      if (ageRange) user.ageRangeId = ageRange.id
    } else if (user.age >= 36 && user.age <= 45) {
      const ageRange = await AgeRange.query()
        .where('minAge', '<=', 45)
        .andWhere('maxAge', '>=', 36)
        .first()
      if (ageRange) user.ageRangeId = ageRange.id
    } else {
      const ageRange = await AgeRange.query().where('minAge', '>=', 46).first()
      if (ageRange) user.ageRangeId = ageRange.id
    }
  }
}

// database/seeders/AgeRangeSeeder.ts

import { BaseSeeder } from '@adonisjs/lucid/seeders'
import AgeRange from '#models/age_range'

export default class AgeRangeSeeder extends BaseSeeder {
  public async run() {
    await AgeRange.createMany([
      { label: '18-25', minAge: 18, maxAge: 25 },
      { label: '26-35', minAge: 26, maxAge: 35 },
      { label: '36-45', minAge: 36, maxAge: 45 },
      { label: '46-60', minAge: 46, maxAge: 60 },
      { label: '60+', minAge: 60, maxAge: 100 },
    ])
  }
}

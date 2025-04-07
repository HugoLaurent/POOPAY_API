// database/seeders/SalaryRangeSeeder.ts

import { BaseSeeder } from '@adonisjs/lucid/seeders'
import SalaryRange from '#models/salary_range'

export default class SalaryRangeSeeder extends BaseSeeder {
  public async run() {
    // Liste des tranches salariales
    const salaryRanges = [
      { label: 'Moins de 1500€', minValue: 0, maxValue: 1500 },
      { label: '1500€ - 2000€', minValue: 1500, maxValue: 2000 },
      { label: '2000€ - 2500€', minValue: 2000, maxValue: 2500 },
      { label: '2500€ - 3000€', minValue: 2500, maxValue: 3000 },
      { label: '3000€ - 3500€', minValue: 3000, maxValue: 3500 },
      { label: '3500€ - 4000€', minValue: 3500, maxValue: 4000 },
      { label: '4000€ - 4500€', minValue: 4000, maxValue: 4500 },
      { label: '4500€ - 5000€', minValue: 4500, maxValue: 5000 },
      { label: 'Plus de 5000€', minValue: 5000, maxValue: null }, // Salaire illimité
    ]

    // Insérer les tranches salariales dans la table `salary_ranges`
    await SalaryRange.createMany(salaryRanges)
  }
}

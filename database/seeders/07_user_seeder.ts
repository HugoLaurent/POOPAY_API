// database/seeders/UserSeeder.ts

import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'
import { faker } from '@faker-js/faker'
import Sector from '#models/sector'
import EmploymentStatus from '#models/employment_status'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    // Récupérer les secteurs, les statuts d'emploi et les tranches salariales
    const sectors = await Sector.all()
    const employmentStatuses = await EmploymentStatus.all()

    // Créer 30 utilisateurs avec Faker
    await User.createMany(
      Array.from({ length: 30 }, () => ({
        username: faker.internet.displayName(), // Nom d'utilisateur généré aléatoirement
        password: 'password', // Mot de passe par défaut pour les tests
        age: faker.number.int({ min: 18, max: 65 }), // Âge aléatoire entre 18 et 65
        company: faker.company.name(), // Nom de l'entreprise généré aléatoirement
        postalCode: faker.location.zipCode(), // Code postal aléatoire
        monthlySalary: faker.number.int({ min: 1500, max: 5000 }), // Salaire mensuel aléatoire entre 1500 et 5000
        monthlyHours: faker.number.int({ min: 120, max: 200 }), // Heures mensuelles aléatoires entre 120 et 200
        sectorId: faker.helpers.arrayElement(sectors)?.id, // Secteur choisi aléatoirement
        statusId: faker.helpers.arrayElement(employmentStatuses)?.id, // Statut choisi aléatoirement
      }))
    )
  }
}

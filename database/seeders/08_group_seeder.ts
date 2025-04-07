// database/seeders/GroupSeeder.ts

import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Group from '#models/group'
import User from '#models/user'
import { faker } from '@faker-js/faker'

export default class GroupSeeder extends BaseSeeder {
  public async run() {
    // Récupérer tous les utilisateurs de la table `users`
    const users = await User.all()

    // Générer 30 groupes avec Faker pour des noms et descriptions aléatoires
    await Group.createMany(
      users.map((user) => ({
        name: faker.company.name(), // Nom du groupe généré aléatoirement
        description: faker.lorem.sentence(), // Description du groupe générée aléatoirement
        creatorId: user.id, // ID de l'utilisateur qui est le propriétaire du groupe
      }))
    )
  }
}

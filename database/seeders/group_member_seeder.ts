// database/seeders/GroupMemberSeeder.ts

import { BaseSeeder } from '@adonisjs/lucid/seeders'
import GroupMember from '#models/group_member'
import Group from '#models/group'
import User from '#models/user'
import { faker } from '@faker-js/faker'
import { DateTime } from 'luxon'

export default class GroupMemberSeeder extends BaseSeeder {
  public async run() {
    // Récupérer tous les utilisateurs de la table `users`
    const users = await User.all()

    // Récupérer tous les groupes de la table `groups`
    const groups = await Group.all()

    // Pour chaque groupe, ajouter des membres aléatoires
    for (const group of groups) {
      const numberOfMembers = faker.number.int({ min: 3, max: 7 }) // Chaque groupe a entre 3 et 7 membres

      for (let i = 0; i < numberOfMembers; i++) {
        // Choisir un utilisateur aléatoire dans la liste des utilisateurs
        const randomUser = faker.helpers.arrayElement(users)

        await GroupMember.create({
          groupId: group.id, // ID du groupe
          userId: randomUser.id, // ID de l'utilisateur (membre)
          joinedAt: DateTime.fromJSDate(faker.date.past()), // Conversion de la date en DateTime<boolean>
        })
      }
    }
  }
}

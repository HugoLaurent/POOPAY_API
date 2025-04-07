// database/seeders/SectorSeeder.ts

import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Sector from '#models/sector'

export default class SectorSeeder extends BaseSeeder {
  public async run() {
    // Liste des secteurs d'activité
    const sectors = [
      { name: 'Informatique' },
      { name: 'Santé' },
      { name: 'Marketing' },
      { name: 'Finance' },
      { name: 'Éducation' },
      { name: 'Commerce' },
      { name: 'Industrie' },
      { name: 'Transport' },
      { name: 'Énergie' },
      { name: 'Agriculture' },
      { name: 'Construction' },
      { name: 'Services publics' },
      { name: 'Art et culture' },
      { name: 'Tourisme' },
      { name: 'Immobilier' },
      { name: 'Assurance' },
      { name: 'Ressources humaines' },
      { name: 'Recherche et développement' },
      { name: 'Audit et conseils' },
      { name: 'Télécommunications' },
    ]

    // Insérer les secteurs dans la base de données
    await Sector.createMany(sectors)
  }
}

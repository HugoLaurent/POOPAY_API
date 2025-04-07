// database/seeders/RegionSeeder.ts

import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Region from '#models/region'

export default class RegionSeeder extends BaseSeeder {
  public async run() {
    // Liste des 18 régions de France
    const regions = [
      { postalCode: '75001', regionName: 'Île-de-France', departmentName: 'Paris' },
      { postalCode: '69001', regionName: 'Auvergne-Rhône-Alpes', departmentName: 'Lyon' },
      {
        postalCode: '13001',
        regionName: "Provence-Alpes-Côte d'Azur",
        departmentName: 'Marseille',
      },
      { postalCode: '59000', regionName: 'Hauts-de-France', departmentName: 'Lille' },
      { postalCode: '33000', regionName: 'Nouvelle-Aquitaine', departmentName: 'Bordeaux' },
      { postalCode: '44000', regionName: 'Pays de la Loire', departmentName: 'Nantes' },
      { postalCode: '31000', regionName: 'Occitanie', departmentName: 'Toulouse' },
      {
        postalCode: '34000',
        regionName: 'Languedoc-Roussillon-Midi-Pyrénées',
        departmentName: 'Montpellier',
      },
      { postalCode: '56000', regionName: 'Bretagne', departmentName: 'Rennes' },
      { postalCode: '59000', regionName: 'Grand Est', departmentName: 'Strasbourg' },
      { postalCode: '13001', regionName: 'Normandie', departmentName: 'Rouen' },
      { postalCode: '38000', regionName: 'Auvergne', departmentName: 'Clermont-Ferrand' },
      { postalCode: '21000', regionName: 'Bourgogne-Franche-Comté', departmentName: 'Dijon' },
      { postalCode: '44000', regionName: 'Corsica', departmentName: 'Ajaccio' },

      // Outre-mer (5 régions)
      { postalCode: '97400', regionName: 'La Réunion', departmentName: 'Saint-Denis' },
      { postalCode: '97100', regionName: 'Guadeloupe', departmentName: 'Basse-Terre' },
      { postalCode: '97200', regionName: 'Martinique', departmentName: 'Fort-de-France' },
      { postalCode: '97300', regionName: 'Guyane', departmentName: 'Cayenne' },
      { postalCode: '98600', regionName: 'Mayotte', departmentName: 'Mamoudzou' },
    ]

    // Insérer les régions dans la base de données
    await Region.createMany(regions)
  }
}

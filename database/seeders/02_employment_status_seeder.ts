// database/seeders/EmploymentStatusSeeder.ts

import { BaseSeeder } from '@adonisjs/lucid/seeders'
import EmploymentStatus from '#models/employment_status'

export default class EmploymentStatusSeeder extends BaseSeeder {
  public async run() {
    await EmploymentStatus.createMany([
      { name: 'Salarié' }, // Employé classique, en contrat CDI/CDD
      { name: 'Cadre' }, // Cadre, position plus élevée
      { name: 'Freelance' }, // Travailleur indépendant
      { name: 'Stagiaire' }, // Stagiaire, contrat temporaire
      { name: 'Interim' }, // Travail intérimaire
      { name: 'Contractuel' }, // Salarié sous contrat déterminé
      { name: 'Auto-entrepreneur' }, // Travailleur sous le statut auto-entrepreneur
      { name: 'Indépendant' }, // Salarié indépendant
      { name: 'Artisan' }, // Artisan, souvent indépendant
      { name: 'Commerçant' }, // Propriétaire d'une boutique ou commerce
      { name: 'Employé de bureau' }, // Employé administratif de bureau
      { name: 'Cadre supérieur' }, // Cadre supérieur avec des responsabilités stratégiques
      { name: 'Directeur' }, // Directeur d’un département
      { name: 'Manager' }, // Responsable d’une équipe
    ])
  }
}

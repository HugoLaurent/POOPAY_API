import PostalCode from '#models/postal_code'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import fs from 'node:fs'

export default class extends BaseSeeder {
  public async run() {
    const data = JSON.parse(fs.readFileSync('codes_postaux.json', 'utf-8'))

    await PostalCode.createMany(
      data.map((item) => ({
        codePostal: item.Code_postal,
        nomCommune: item.Nom_de_la_commune,
      }))
    )

    console.log(`✅ ${data.length} codes postaux insérés.`)
  }
}

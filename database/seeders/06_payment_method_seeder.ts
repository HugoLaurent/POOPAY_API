import { BaseSeeder } from '@adonisjs/lucid/seeders'
import PaymentMethod from '#models/payment_method'

export default class extends BaseSeeder {
  async run() {
    await PaymentMethod.createMany([
      { name: 'Stripe', description: 'Paiement par carte bancaire via Stripe' },
      { name: 'PayPal', description: 'Paiement via PayPal' },
      { name: 'Donation', description: 'Soutien via dons' },
    ])
  }
}

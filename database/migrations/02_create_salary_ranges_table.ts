import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'salary_ranges'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      table.string('label').notNullable() // ex: "SMIC", "2000–2500€"
      table.decimal('min_value', 10, 2).notNullable()
      table.decimal('max_value', 10, 2).nullable() // null si pas de max (ex: "+4000€")

      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

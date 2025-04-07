import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('username').notNullable().unique()
      table.string('password').notNullable()
      table.integer('age').notNullable()
      table.integer('sector_id').nullable().references('id').inTable('sectors').onDelete('SET NULL')
      table
        .integer('status_id')
        .nullable()
        .references('id')
        .inTable('employment_statuses')
        .onDelete('SET NULL')
      table.string('company').nullable()
      table.string('postal_code').notNullable()
      table
        .integer('salary_range_id')
        .nullable()
        .references('id')
        .inTable('salary_ranges')
        .onDelete('SET NULL')
      table
        .integer('age_range_id')
        .nullable()
        .references('id')
        .inTable('age_ranges')
        .onDelete('SET NULL')
      table.decimal('monthly_salary', 10, 2).notNullable()
      table.decimal('monthly_hours', 5, 2).notNullable()
      table.decimal('hourly_rate', 10, 2).notNullable()

      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

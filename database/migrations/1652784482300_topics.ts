import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Topics extends BaseSchema {
  protected tableName = 'topics'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('title', 25).notNullable()
      table.string('description', 255).notNullable()
      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
      // table.integer('user_id').notNullable()
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}

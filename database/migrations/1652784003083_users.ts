import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('firstname', 35).notNullable()
      table.string('lastname', 35).notNullable()
      table.string('nickname', 15).notNullable().unique()
      table.string('email', 155).notNullable().unique()
      table.string('password', 155).notNullable()
      table.string('thumbnail', 255).nullable().defaultTo('')
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}

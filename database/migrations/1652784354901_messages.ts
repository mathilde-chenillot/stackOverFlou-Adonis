import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Messages extends BaseSchema {
  protected tableName = 'messages'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('content', 255).notNullable()
      // table.integer('user_id').unsigned().references('users.id').onDelete('CASCADE')
      // table.integer('topic_id').unsigned().references('topics.id').onDelete('CASCADE')
      table.integer('user_id').notNullable()
      table.integer('topic_id').notNullable()
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}

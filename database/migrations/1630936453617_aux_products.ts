import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Products extends BaseSchema {
  protected tableName = 'aux_products'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id') 
      table.integer('code').notNullable().unique().unsigned()
      table.string('product', 60).notNullable().unique()
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

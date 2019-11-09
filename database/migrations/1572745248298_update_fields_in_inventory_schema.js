'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UpdateFieldsInInventorySchema extends Schema {
  up () {
    this.alter('inventories', (table) => {
      // alter table
      table.dropForeign('user_id', 'inventories_user_id_foreign')
      table.dropColumn('user_id')
      table.integer('business_id').unsigned().references('id').inTable('businesses')
    })
  }

  down () {
    this.alter('inventories', (table) => {
      table.dropForeign('business_id', 'inventories_business_id_foreign')
      table.dropColumn('business_id')
    })
  }
}

module.exports = UpdateFieldsInInventorySchema

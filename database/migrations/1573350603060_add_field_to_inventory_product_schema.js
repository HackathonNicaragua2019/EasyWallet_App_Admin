'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddFieldToInventoryProductSchema extends Schema {
  up () {
    this.alter('inventory_product', (table) => {
      // alter table
      table.integer('inStock').notNullable()
    })
  }

  down () {
    this.alter('inventory_product', (table) => {
      // reverse alternations
      table.dropColumn('inStock')
    })
  }
}

module.exports = AddFieldToInventoryProductSchema

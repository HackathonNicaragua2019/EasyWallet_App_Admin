'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class InventoryProductSchema extends Schema {
  up () {
    this.create('inventory_product', (table) => {
      table.decimal('purchase_price').notNullable()
      table.decimal('sale_price').notNullable()
      table.integer('inventory_id').unsigned().index('inventory_id')
      table.foreign('inventory_id').references('inventories.id')
      table.integer('product_id').unsigned().index('product_id')
      table.foreign('product_id').references('products.id')
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('inventory_product')
  }
}

module.exports = InventoryProductSchema

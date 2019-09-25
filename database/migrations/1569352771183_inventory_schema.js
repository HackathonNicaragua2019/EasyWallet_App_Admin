'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class InventorySchema extends Schema {
  up () {
    this.create('inventories', (table) => {
      table.string('name').notNullable()
      table.string('description').notNullable()
      //Relationships
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('inventories')
  }
}

module.exports = InventorySchema

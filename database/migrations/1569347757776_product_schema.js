'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductSchema extends Schema {
  up () {
    this.create('products', (table) => {
      table.string('name').notNullable()
      table.string('description').notNullable()
      table.date('expiration_date').nullable()
      table.increments()
      table.timestamps()
      // Relationships
      table.integer('user_id').unsigned().references('id').inTable('users')
    })
  }

  down () {
    this.drop('products')
  }
}

module.exports = ProductSchema

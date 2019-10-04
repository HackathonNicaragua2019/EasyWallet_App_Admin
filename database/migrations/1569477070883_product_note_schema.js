'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductNoteSchema extends Schema {
  up () {
    this.create('product_notes', (table) => {
      table.string('note').notNullable()
      table.integer('product_id').unsigned().index('product_id')
      table.foreign('product_id').references('id').inTable('products').onDelete('cascade')
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('product_notes')
  }
}

module.exports = ProductNoteSchema

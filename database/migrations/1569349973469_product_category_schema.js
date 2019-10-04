'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductCategorySchema extends Schema {
  up () {
    this.create('product_category', (table) => {
      // Relationships
      table.integer('category_id').unsigned().index('category_id')
      table.foreign('category_id').references('id').inTable('categories').onDelete('cascade')
      table.integer('product_id').unsigned().index('product_id')
      table.foreign('product_id').references('id').inTable('products').onDelete('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('product_category')
  }
}

module.exports = ProductCategorySchema

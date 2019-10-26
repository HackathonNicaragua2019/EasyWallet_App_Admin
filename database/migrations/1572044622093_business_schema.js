'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BusinessSchema extends Schema {
  up () {
    this.create('businesses', (table) => {
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.string('name').notNullable()
      table.string('description').notNullable()
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('businesses')
  }
}

module.exports = BusinessSchema

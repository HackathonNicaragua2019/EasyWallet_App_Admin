'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

const User = use('App/Models/User')
const Category = use('App/Models/Category')
const Inventory = use('App/Models/Inventory')

class Product extends Model {

  static getValidationRules () {
    const rules = {
      name: 'required',
      description: 'required',
      expiration_date: 'date'
    }
    return rules
  }

  inventories () {
    return this.belongsToMany(Inventory, 'product_id', 'inventory_id').pivotTable('inventory_product')
  }

  user () {
    return this.belongsTo(User)
  }

  category () {
    return this.belongsToMany(Category).pivotTable('product_category')
  }

}

module.exports = Product

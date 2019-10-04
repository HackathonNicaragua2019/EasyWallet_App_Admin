'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Product = use('App/Models/Product')
const User = use('App/Models/User')
const InventoryProduct = use('App/Models/InventoryProduct')

class Inventory extends Model {

  products () {
    return this.belongsToMany(Product, 'inventory_id', 'product_id').pivotTable('inventory_product')
  }

  user () {
    this.belongsTo(User)
  }

  static getValidationRules () {
    const rules = {
      name: 'required',
      description: 'required'
    }
    return rules
  }
}

module.exports = Inventory

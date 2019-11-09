'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
// const Product = use('App/Models/Product')
const User = use('App/Models/User')
// const InventoryProduct = use('App/Models/InventoryProduct')

class Inventory extends Model {

  products () {
    return this.belongsToMany('App/Models/Product').pivotTable('inventory_product')
  }

  business () {
    this.belongsTo('App/Models/Business')
  }

  static getValidationRules () {
    const rules = {
      name: 'required',
      description: 'required',
      business_id: 'required'
    }
    return rules
  }
}

module.exports = Inventory

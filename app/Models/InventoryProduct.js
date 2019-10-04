'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

const Inventory = use('App/Models/Inventory')
const Product = use('App/Models/Product')



class InventoryProduct extends Model {

  static get table () {
    return 'inventory_product'
  }

  static getValidationRules () {
    const rules = {
      purchase_price: 'required|float',
      sale_price: 'required|float'
    }
  }

  products () {
    return this.hasMany(Product)
  }

  inventories () {
    return this.hasMany(Inventory)
  }

}

module.exports = InventoryProduct

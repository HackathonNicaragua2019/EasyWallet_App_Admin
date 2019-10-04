'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Product = use('App/Models/Product')


class Category extends Model {
    
  static getValidationRules () {
    const rules = {
      name: 'required',
      description: 'required'
    }
    return rules
  }

  product () {
    return this.belongsToMany(Product).pivotTable('product_category')
    // return this.belongsToMany(Product).pivotTable('product_categories')
  }

}

module.exports = Category
'use strict'

  /** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Product = use('App/Models/Product')
const Category = use('App/Models/Category')

class ProductCategory extends Model {

    products () {
      return this.hasMany(Product)
    }
    categories () {
      return this.hasMany(Category)
    }
    
}

module.exports = ProductCategory

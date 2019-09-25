'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const User = use('App/Models/User')
const Category = use('App/Models/Category')

class Product extends Model {

    user () {
        return this.belongsTo(User)
    }

    categories () {
        return this.hasMany(Category)
    }

}

module.exports = Product

'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Product = use('App/Models/Product')
const User = use('App/Models/User')

class Inventory extends Model {
    products () {
        this.hasMany(Product)
    }

    user () {
        this.belongsTo(User)
    }
}

module.exports = Inventory

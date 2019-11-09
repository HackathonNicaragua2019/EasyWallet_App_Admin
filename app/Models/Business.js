'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Business extends Model {

  user () {
    return this.belongsTo('App/Models/User')
  }

  inventories () {
    return this.hasMany('App/Models/Inventory')
  }

  static getValidationRules () {
    const rules = {
      name: 'required',
      description: 'required',
    }
    return rules
  }

}

module.exports = Business

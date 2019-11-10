'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Profile extends Model {

  user () {
    this.belongsTo('App/Models/User')
  }

  static getValidationRules () {
    const rules = {
      first_name: 'required',
      last_name: 'required',
      dni: 'required',
      phone_number: 'required'
    }
    return rules
  }

}

module.exports = Profile

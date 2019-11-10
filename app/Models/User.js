'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

class User extends Model {

  static getLoginValidationRules() {
    const rules = {
      email: 'required',
      password: 'required'
      
    }
    return rules
  }
  
  static getValidationRules () {
    const rules = {
      name: 'required',
      email: 'required|email',
      role_id: 'required',
      password: 'required|min:6'
    }
    return rules
  }

  static boot () {
    super.boot()

    this.addTrait('@provider:Cerberus/Traits/Role')
    this.addTrait('@provider:Cerberus/Traits/Permission')
    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens () {
    return this.hasMany('App/Models/Token')
  }

  products () {
    return this.hasMany('App/Models/Product')
  }

  business () {
    return this.hasMany('App/Models/Business')
  }

  profile () {
    return this.hasOne('App/Models/Profile')
  }

  inventories () {
    return this.manyThrough('App/Models/Business', 'inventories')
  }
}

module.exports = User

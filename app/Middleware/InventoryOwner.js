'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Inventory = use('App/Models/Inventory')

class InventoryOwner {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ auth, response, params, request }, next) {
    if (params.inventoryId) {
      let user = auth.user
      let inventory = await user.inventories().where('inventories.id', params.inventoryId).fetch()
      if (inventory.rows.length > 0) {
        await next()
      }
      else {
        return response.status(404).send('You are not inventory owner')
      }
    }
    else {
      return response.status(404).send('You are not inventory owner')
    }
  }
}

module.exports = InventoryOwner

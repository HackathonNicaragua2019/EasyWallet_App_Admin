'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const User = use('App/Models/User')
const Inventory = use('App/Models/Inventory')
const Product = use('App/Models/Product')

class OwnerDetector {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */

  async isInventoryOwner (user, inventoryId) {
    try {
      let inventory = await Inventory.query().where({ id: inventoryId, user_id: user.id}).fetch()
      if (inventory.rows.length > 0) {
        return true
      }
      else {
        return false
      }
    }
    catch (e) {
      return false
    }
  }

  async isProductOwner (user, productId) {
    try {
      let product = await Product.query().where({ id: productId, user_id: user.id}).fetch()
      if (product.rows.length > 0) {
        return true
      }
      else{
        return false
      }
    }
    catch (e) {
      return false
    }
  
  }

  async handle ({ auth, response, request, params }, next) {
    try {
      const user = await auth.getUser()
      if (params.username){
        if (params.username != user.username) {
          return response.status(404).send('You are not owner')
        }
        else {
          await next()
        }
        
      }
      
      if (params.inventoryId) {
        
        if (await this.isInventoryOwner(user, params.inventoryId)) {
          await next()
        }
        else {
          return response.status(404).send('You are not owner')
        }
      }
      
      if (params.productId) {
        if (await this.isProductOwner(user, params.productId)) {
          await next()
        }
        else {
          return response.status(404).send('You are not owner')
        }
      }

      if (params.productId && params.inventoryId) {
        if (await this.isProductOwner(user, params.productId) && await this.isInventoryOwner(user, params.inventoryId)) {
          await next()
        }
        else {
          return response.status(404).send('You are not owner')
        }
      }

    }
    catch (e) {
        console.log(e)
        return response.status(404).send('Forbidden, not allowed')
    }
  }
}

module.exports = OwnerDetector

'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const User = use('App/Models/User')
const Business = use('App/Models/Business')
const Inventory = use('App/Models/Inventory')
const Product = use('App/Models/Product')

class OwnerDetector {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */


  async isBusinessOwner (user, bussinesId) {
    try {
      let business = await Business.query().where({ user_id: user.id }).fetch()
      if (business.rows.length > 0) {
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

  async isInventoryOwner (user, inventoryId) {
    try {
      let inventory = await user.inventories().query().where('id', inventoryId).fetch()
      console.log('ummm')
      // let inventory = await Inventory.query().where({ id: inventoryId, user_id: user.id }).fetch()
      if (inventories.rows.length > 0) {
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
      console.log('Here product')
      // let product = await user.products().fetch()
      let variable = await auth.user.products().fetch()
      console.log(variable)
      // let product = await Product.query().where({ id: productId, user_id: user.id }).fetch()
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
      
      // if (request.input('business_id') || params.businessId) {
      //   if (await this.isBusinessOwner(user, request.input('business_id'))) {
      //     await next()
      //   }
      //   else {
      //     return response.status(404).send('You are not owner')
      //   }
      // }

      if (params.productId && params.inventoryId) {
        console.log('here??v3')
        if (await this.isProductOwner(user, params.productId) && await this.isInventoryOwner(user, params.inventoryId)) {
          await next()
        }
        else {
          return response.status(404).send('You are not owner')
        }
      }

      if (params.inventoryId) {
        console.log('here??v0')        
        if (await this.isInventoryOwner(user, params.inventoryId)) {
          await next()
        }
        else {
          return response.status(404).send('You are not owner')
        }
      }
      
      if (params.productId) {
        console.log('here??v1')
        if (await this.isProductOwner(user, params.productId)) {
          await next()
        }
        else {
          return response.status(404).send('You are not owner')
        }
      }

      if (params.businessId) {
        console.log('here??v2')
        if (await this.isBusinessOwner(user, params.businessId)) {
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

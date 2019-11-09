'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Product = use('App/Models/Product')

class ProductOwner {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ auth, response, params }, next) {
    if (params.productId) {
      let product = await Product.findOrFail(params.productId)
      if (product.user_id == auth.user.id) {
        await next()
      }
      else {
        return response.status(404).send('You are not product owner')
      }
    }
    else {
      return response.status(404).send('You are not product owner')
    }
  }
}

module.exports = ProductOwner

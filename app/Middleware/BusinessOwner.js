'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Business = use('App/Models/Business')

class BusinessOwner {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */

  async handle ({ response, request, auth }, next) {
    if (request.input('business_id')) {
      let business = await Business.findOrFail(request.input('business_id'))
      if (business.user_id == auth.user.id) {
        await next()
      }
      else {
        return response.status(404).send('You are not business owner')
      }
    }
    else {
      return response.status(404).send('You are not business owner')
    }
  }
}

module.exports = BusinessOwner

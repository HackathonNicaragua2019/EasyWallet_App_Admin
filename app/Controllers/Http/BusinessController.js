'use strict'

const Business = use('App/Models/Business')

const Validator = use('App/Helpers/Validator')

class BusinessController {

  async index ({ auth, response }) {
    let user = auth.user
    let businesses = await user.business().with('inventories').fetch()
    return response.status(200).send(businesses)
  }
  
  async show ({ response, params }) {
    let business = await Business.findOrFail(params.businessId)
    return response.status(200).send(business)
  }

  async store ({ auth, request, response }) {
    await Validator.validateData(request.all(), Business.getValidationRules())
    if (!Validator.isValidated()) {
      return response.status(422).send(Validator.getValidationMessage())
    }
    let business = new Business()
    business.name = request.input('name')
    business.description = request.input('description')
    business.user_id = auth.user.id
    await business.save()
    return response.status(422).send(business)
  }

  async update ({ request, response, params }) {
    await Validator.validateData(request.all(), Business.getValidationRules())
    if (!Validator.isValidated()) {
      return response.status(422).send(Validator.getValidationMessage())
    }
    let business = await Business.findOrFail(params.businessId)
    business.name = request.input('name')
    business.description = request.input('description')
    await business.save()
    return response.status(201).send(business)
  }
  
  async delete ({ response, params }) {
    let business = await Business.findorFail(params.businessId)
    await business.delete()
    return response.status(204).send('Destroyed')
  }

}

module.exports = BusinessController

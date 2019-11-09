'use strict'

const Business = use('App/Models/Business')
const Inventory = use('App/Models/Inventory')
const Product = use('App/Models/Product')
const InventoryProduct = use('App/Models/InventoryProduct')

const Validator = use('App/Helpers/Validator')

class InventoryController {

  async index ({ response, auth }) { // in progress
    const inventories = await auth.user.inventories().fetch()
    response.status(200).send(inventories)
  }

  async show ({ response, auth, params }) { // In progress
    const inventory = await auth.user.inventories().query().where('id', params.inventoryId).fetch()
    response.status(200).send({ inventory: inventory })
  }

  async store ({ response, auth, request }) {
    await Validator.validateData(request.all(), Inventory.getValidationRules())
    if (!Validator.isValidated()) {
      response.status(422).send(Validator.getValidationMessage())
    }
    let business = await Business.findOrFail(request.input('business_id'))
    let inventory = new Inventory()
    inventory.business_id = business.id
    inventory.name = request.input('name')
    inventory.description = request.input('description')
    await inventory.save()
    response.status(201).send(inventory)
  }

  async addProduct ({ response, params, request }) {
    await Validator.validateData(request.all(), InventoryProduct.getValidationRules())
    if (!Validator.isValidated()) {
      response.status(422).send(Validator.getValidationMessage())
    }
    const assignment = new InventoryProduct()
    assignment.purchase_price = request.input('purchase_price')
    assignment.sale_price = request.input('sale_price')
    assignment.inventory_id = params.inventoryId
    assignment.product_id = params.productId
    await assignment.save()
    response.status(201).send(assignment)
  }

  async updateProduct ({ response, params, request }) {
    await Validator.validateData(request.all(), InventoryProduct.getValidationRules())
    if (!Validator.isValidated()) {
      response.status(422).send(Validator.getValidationMessage())
    }
    const assignment = await InventoryProduct().query({inventory_id: params.inventoryId})
    assignment.purchase_price = request.input('purchase_price')
    assignment.sale_price = request.input('sale_price')
    await assignment.save()
    response.status(201).send(assignment)
  }

}

module.exports = InventoryController

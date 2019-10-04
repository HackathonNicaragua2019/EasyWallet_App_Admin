'use strict'

const Inventory = use('App/Models/Inventory')
const Product = use('App/Models/Product')
const InventoryProduct = use('App/Models/InventoryProduct')

const Validator = use('App/Helpers/Validator')

class InventoryController {

  async index ({ response, auth }) {
    const inventories = auth.user.inventories().fetch()
    response.status(200).send(inventories)
  }

  async show ({ response, auth, params }) {
    const inventory = await Inventory.findOrFail(params.inventoryId)
    console.log(inventory.products())
    const products = await inventory.products().fetch()
    console.log(products)
    response.status(200).send({ inventory: inventory, products: products })
  }

  async store ({ response, auth, request }) {
    await Validator.validateData(request.all(), Inventory.getValidationRules())
    if (!Validator.isValidated()) {
      response.status(422).send(Validator.getValidationMessage())
    }
    let inventory = new Inventory()
    inventory.name = request.input('name')
    inventory.description = request.input('description')
    inventory.user_id = auth.user.id
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

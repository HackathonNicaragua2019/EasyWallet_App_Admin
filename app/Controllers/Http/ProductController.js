'use strict'

const Product = use('App/Models/Product')

const Validator = use('App/Helpers/Validator')

class ProductController {
  
  async index ({ response, auth }) {
    const user = auth.user
    const products = await user.products().fetch()
    
    response.status(200).send(products)
  }

  async show ({ response, params }) {
    const product = await Product.query()
      .with('categories')
      .with('inventories')
      .where('id' , params.productId).fetch()
    response.status(200).send({ product: product })
  }

  async store ({ response, request, auth }) {
    await Validator.validateData(request.all(), Product.getValidationRules())
    if (!Validator.isValidated()) {
      return response.status(422).send(Validator.getValidationMessage())
    }
    let product = new Product()
    product.name = request.input('name')
    product.description = request.input('description')
    product.expiration_date = request.input('expiration_date')
    product.user_id = auth.user.id
    await product.save()
    response.status(201).send(product)
  }

  async update ({ response, request, params }) {
    await Validator.validateData(request.all(), Product.getValidationRules())
    if (!Validator.isValidated()) {
      return response.status(422).send(Validator.getValidationMessage())
    }
    let product = await Product.findOrFail(params.productId)
    product.name = request.input('name')
    product.description = request.input('description')
    product.expiration_date = request.input('expiration_date')
    await product.save()
    response.status(201).send(product)
  }

  async delete ({ response, params }) {
   const product = await Product.find(params.productId)
   await product.delete()
    response.status(204).send('Destroyed')
  }

  async searchByName ({ response, request }) {
    let productName = request.input('productName')
    console.log(productName)
    if (productName) {
      // Search product by name, matching possibilities
      let products = await Product.query().whereRaw(`name like '${productName}%'`).fetch()
      products = products.toJSON()
      if (products.length > 0) {
        response.status(200).send(products)
      }
      else {
        response.status(404).send()
      }
    }
  }

}

module.exports = ProductController

'use strict'

const Category = use('App/Models/Category')

const Validator = use('App/Helpers/Validator')

class CategoryController {
    
    async index ({ response }) {
        const categories = await Category.all()
        response.send(categories)
    }

    async show ({ response, params }) {
        const category = await Category.findOrFail(params.categoryId)
        response.status(200).send(category)
    }

    async store ( { response, request }) {
        await Validator.validateData(request.all(), Category.getValidationRules())
        if (!Validator.isValidated()) {
            return response.status(422).send(Validator.getValidationMessage())
        }
        const category = new Category()
        category.name = request.input('name')
        category.description = request.input('description')
        await category.save()
        response.status(201).send(category)
    }

    async update ({ response, request, params }) {
        await Validator.validateData(request.all(), Category.getValidationRules())
        if (!Validator.isValidated()) {
            return response.status(422).send(Validator.getValidationMessage())
        }
        const category = await Category.findOrFail(params.categoryId)
        category.name = request.input('name')
        category.description = request.input('description')
        await category.save()
        response.status(200).send(category)
    }

    async delete ({ response, params }) {
        const category = await Category.findOrFail(params.categoryId)
        await category.delete()
        response.status(204).send('Destroyed')
    }
}

module.exports = CategoryController

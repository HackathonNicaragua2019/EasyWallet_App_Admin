'use strict'

/*
|--------------------------------------------------------------------------
| DatabaseSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')


class DatabaseSeeder {
  async run () {

    // User
    const user_1 = await Factory.model('App/Models/User').create()

    // Categories
    const category_1 = await Factory.model('App/Models/Category').create()
    const category_2 = await Factory.model('App/Models/Category').create()
    const category_3 = await Factory.model('App/Models/Category').create()

    // Products
    const product_1 = await Factory.model('App/Models/Product').create()
    const product_2 = await Factory.model('App/Models/Product').create()
    const product_3 = await Factory.model('App/Models/Product').create()
    const product_4 = await Factory.model('App/Models/Product').create()
    const product_5 = await Factory.model('App/Models/Product').create()
    const product_6 = await Factory.model('App/Models/Product').create()

    // Categories into products.

    // product_1.category().attach(category_1)


    // Assing Product's owner

    await user_1.products().save(product_1)
    await user_1.products().save(product_2)
    await user_1.products().save(product_3)
    await user_1.products().save(product_4)
    await user_1.products().save(product_5)
    await user_1.products().save(product_6)
    
    // Inventory

    const inventory = await Factory.model('App/Models/Inventory').create()
    user_1.inventories().save(inventory)
    // inventory.products().save(product_1)

    
    

    

    
    

  }
}

module.exports = DatabaseSeeder

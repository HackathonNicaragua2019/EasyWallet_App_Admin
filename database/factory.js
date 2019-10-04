'use strict'



/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Hash = use('Hash')

Factory.blueprint('App/Models/User', async (faker) => {
  return {
    username: faker.username(),
    email: faker.email(),
    password: await Hash.make('default123')
  }
})

Factory.blueprint('App/Models/Category', (faker) => {
    return {
        name: faker.first(),
        description: faker.sentence()
    }
})

Factory.blueprint('App/Models/Product', (faker) => {
    return {
        name: faker.syllable(),
        description: faker.sentence(),
        expiration_date: faker.date()
    }
})

Factory.blueprint('App/Models/Inventory', (faker) => {
    return {
        name: faker.first(),
        description: faker.sentence(),
        user_id: 1
    }
})
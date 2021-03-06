'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})


Route.group(() => {
  Route.post('/register', 'AuthController.register')
  Route.post('/login', 'AuthController.login')
  Route.post('/role', 'AuthController.createRole')
}).prefix('/auth')


Route.group(() => {
  // Business
  Route.get('/businesses', 'BusinessController.index')
  Route.get('/business/:businessId', 'BusinessController.show')
  Route.post('/business', 'BusinessController.store')
  Route.put('/business/:businessId', 'BusinessController.update')
  Route.delete('/business/:businessId', 'BusinessController.delete')

  // Profiles
  Route.get('/profile/', 'ProfileController.show')
  Route.post('/profile/', 'ProfileController.store')
  Route.put('/profile/', 'ProfileController.update')

  // Categories
  Route.get('/categories', 'CategoryController.index')
  Route.get('/category/:categoryId', 'CategoryController.show')
  Route.post('/category', 'CategoryController.store')
  Route.put('/category/:categoryId', 'CategoryController.update')
  Route.delete('/category/:categoryId', 'CategoryController.delete')

  // Products
  Route.get('/product/:productId', 'ProductController.show').middleware('productOwner')
  Route.get('/products', 'ProductController.index')
  Route.post('/product/', 'ProductController.store')
  Route.put('/product/:productId', 'ProductController.update').middleware('productOwner')
  Route.delete('/product/:productId', 'ProductController.delete').middleware('productOwner')

  // Inventories, prefix -> 'businessId'
  Route.get('/inventory/:inventoryId', 'InventoryController.show')
  Route.get('/inventories', 'InventoryController.index')
  Route.post('/inventory', 'InventoryController.store').middleware('businessOwner')
  // Assing Product to inventory
  Route.post('/inventory/:inventoryId/product/:productId', 'InventoryController.addProduct').middleware('inventoryOwner', 'productOwner')
  // Update existing product in inventory
  Route.put('/inventory/:inventoryId/product/:producctId', 'InventoryController.updateProduct')

  // Searching routes

  // Search product
  Route.post('/search/product/', 'ProductController.searchByName').middleware('owner')
  


}).prefix('/:username').middleware('auth')

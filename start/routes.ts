/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

//Token 
Route.post('/token', 'AuthController.token')

//Usuario
Route.group(()=> {
  Route.post('/create', 'UsersController.postUsers')
  Route.get('/read/:id?', 'UsersController.getUsers').middleware('auth')
  Route.put('/update/:id', 'UsersController.putUsers').middleware('auth')
  Route.delete('/delete/:id', 'UsersController.deleteUsers').middleware('auth')
}).prefix('/users')

//AuxProduct
Route.group(()=> {
  Route.post('/create', 'AuxProductsController.postProduct')
  Route.get('/read/:code?', 'AuxProductsController.getProduct')
}).prefix('/auxproduct').middleware('auth')



Route.get('/', async () => {
  return { hello: 'world' }
})

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

Route.get('/', async () => {
  return { hello: 'world' }
})

// User

Route.group(() => {
  Route.post('/register', 'UsersController.register')
  Route.post('/login', 'UsersController.login')
  Route.post('/logout', 'UsersController.logout')
  Route.group(() => {
    Route.patch('/update', 'UsersController.update')
    Route.delete('/delete/:id', 'UsersController.delete')
  }).middleware('auth')
}).prefix('/api/user')

// Topic & Message
Route.group(() => {
  Route.resource('/topic', 'TopicsController').apiOnly() // resource = raccourci pour enregistrer toutes les routes ensemble, apiOnly() supprime les routes servant à afficher les formulaires
  Route.resource('/message', 'MessagesController').apiOnly()
  Route.get('/message/byTopic/:topicId', 'MessagesController.getAllMessagesByTopic')
})
  .middleware('auth')
  .prefix('/api')

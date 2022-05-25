import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import CreateUserValidator from 'App/Validators/CreateUserValidator'

// const UsersController = {
//   //Cette fonction permet de créer un 'user' selon les informations soumis par l'API (email, username et password)

//   // create user

//   register: async ({ request, response }: HttpContextContract) => {
//     try {
//       const findUser = await User.findBy('email', request.body().email)

//       if (!findUser) {
//         console.log('début')

//         const payload = await request.validate(CreateUserValidator)
//         console.log('payload ------------', payload)
//         const user = await User.create(payload) // problème
//         return response.created(user)
//       } else {
//         return response.status(404).json({ message: 'Le compte existe déjà' })
//       }
//     } catch (error) {
//       response.status(500).send(error.message)
//     } finally {
//       console.log('register')
//       console.log(request.body().email)
//     }
//   },
// }

// export default UsersController

export default class UsersController {
  public async register({ request, response }: HttpContextContract) {
    const findUser = await User.findBy('email', request.body().email)

    if (!findUser) {
      const payload = await request.validate(CreateUserValidator)
      console.log('payload ------------', payload)
      const user = await User.create(payload) // problème
      return response.created(user)
    } else {
      return response.status(404).json({ message: 'Le compte existe déjà' })
    }
  }
}

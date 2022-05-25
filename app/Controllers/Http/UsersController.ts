import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import CreateUserValidator from 'App/Validators/CreateUserValidator'

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

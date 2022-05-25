import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import CreateUserValidator from 'App/Validators/CreateUserValidator'

export default class UsersController {
  // To register

  public async register({ request, response, auth }: HttpContextContract) {
    const findUser = await User.findBy('email', request.body().email)

    if (!findUser) {
      const data = await request.validate(CreateUserValidator)
      const user = await User.create(data)
      await auth.login(user)
      const token = await auth.use('api').login(user, {
        expiresIn: '10 days',
      })
      // return response.created(user) // token.toJson();
      return token.toJSON()
      //return response.redirect('/')
    } else {
      return response.status(404).json({ message: 'Le compte existe déjà' })
    }
  }

  // To logout

  public async logout({ request, response, auth }: HttpContextContract) {
    await auth.use('api').revoke()
    // await auth.logout()

    return {
      revoke: true,
    }
    // return response.redirect('/')
  }
}

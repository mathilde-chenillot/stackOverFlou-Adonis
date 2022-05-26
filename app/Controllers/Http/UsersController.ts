import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import LoginValidator from 'App/Validators/Auth/LoginValidator'
import CreateUserValidator from 'App/Validators/Auth/CreateUserValidator'
import UpdateUserValidator from 'App/Validators/Auth/UpdateUserValidator'

export default class UsersController {
  // To register

  public async register({ request, response, auth }: HttpContextContract) {
    const findUser = await User.findBy('email', request.body().email)
    const findNickname = await User.findBy('nickname', request.body().nickname)

    if (!findUser && !findNickname) {
      const data = await request.validate(CreateUserValidator)
      const user = await User.create(data)
      const token = await auth.use('api').login(user, {
        expiresIn: '10days',
      })

      return response.ok({
        token,
        ...user.serialize(),
      })
    } else if (findUser) {
      return response.status(404).json({ message: 'Le compte existe déjà' })
    } else if (findNickname) {
      return response.status(404).json({ message: 'Le surnom est déjà utilisé' })
    }
  }

  // To login

  public async login({ request, response, auth }: HttpContextContract) {
    const { email, password } = await request.validate(LoginValidator)

    try {
      const token = await auth.attempt(email, password)
      const user = auth.user!

      return response.ok({
        token,
        user,
      })
      // response.redirect('/api/topics')
    } catch (error) {
      return response.badRequest('Email ou mot de passe incorrect')
    }
  }

  // To logout

  public async logout({ response, auth }: HttpContextContract) {
    await auth.use('api').revoke()
    // await auth.use('api').logout()

    return response.ok({
      revoke: true,
    })
    // return response.redirect('/')
  }

  // To update

  public async update({ request, response, auth }: HttpContextContract) {
    try {
      // const user = await User.findOrFail(params.id)
      const data = await request.validate(UpdateUserValidator)
      // await user.merge(data).save()

      const user = await auth.user!.merge(data).save()

      return response.ok(user)
    } catch (error) {
      return response.badRequest("Impossible de trouver l'utilisateur")
    }
  }

  // To delete

  public async delete({ response, params }: HttpContextContract) {
    try {
      const user = await User.findOrFail(params.id)
      await user.delete()
      return response.ok(user)
    } catch (error) {
      return response.badRequest("Impossible de trouver l'utilisateur pour le supprimer")
    }
  }
}

import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    firstname: schema.string.optional({}, [
      rules.alpha({ allow: ['dash'] }),
      rules.minLength(1),
      rules.maxLength(35),
    ]),

    lastname: schema.string.optional({}, [
      rules.alpha({ allow: ['dash'] }),
      rules.minLength(1),
      rules.maxLength(35),
    ]),

    nickname: schema.string.optional({}, [
      rules.unique({ table: 'users', column: 'nickname' }),
      rules.minLength(1),
      rules.maxLength(15),
    ]),

    email: schema.string.optional({ trim: true }, [
      rules.email(),
      rules.unique({ table: 'users', column: 'email' }),
      rules.maxLength(155),
    ]),

    password: schema.string.optional({}, [
      rules.confirmed(),
      rules.minLength(8),
      rules.maxLength(155),
    ]),

    thumbnail: schema.string.nullableAndOptional(),
  })

  public messages = {
    maxLength: '{{ field }} ne doit pas dépasser {{ options.maxLength }} caractères',
    minLength: '{{ field }} doit avoir au minimum {{ options.maxLength }} caractères',
    unique: '{{ field }} existe déjà',
    alpha: "{{ field }} ne doit pas contenir de caractères spéciaux ni d'espace",
    confirmed: 'Les mots de passe ne correspondent pas',
  }
}

import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    firstname: schema.string({}, [
      rules.alpha({ allow: ['dash'] }),
      rules.minLength(1),
      rules.maxLength(35),
    ]),

    lastname: schema.string({}, [
      rules.alpha({ allow: ['dash'] }),
      rules.minLength(1),
      rules.maxLength(35),
    ]),

    nickname: schema.string({}, [
      rules.unique({ table: 'users', column: 'nickname' }),
      rules.minLength(1),
      rules.maxLength(15),
    ]),

    email: schema.string({ trim: true }, [
      rules.email(),
      rules.unique({ table: 'users', column: 'email' }),
      rules.maxLength(155),
    ]),

    password: schema.string({}, [rules.minLength(8), rules.maxLength(155)]), // rules.confirmed(),

    thumbnail: schema.string.nullableAndOptional(),
  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages = {
    maxLength: '{{ field }} ne doit pas dépasser {{ options.maxLength }} caractères',
    minLength: '{{ field }} doit avoir au minimum {{ options.maxLength }} caractères',
    unique: '{{ field }} est existe déjà',
    alpha: "{{ field }} ne doit pas contenir de caractères spéciaux ni d'espace",
    confirmed: 'Les mots de passe ne correspondent pas',
  }
}

import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreatePostValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    title: schema.string({}, [rules.minLength(1), rules.maxLength(25)]),
    description: schema.string({}, [rules.minLength(1), rules.maxLength(255)]),
    user_id: schema.number(),
  })

  public messages = {}
}

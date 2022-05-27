import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateMessageValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    content: schema.string({}, [rules.minLength(1), rules.maxLength(25)]),
    user_id: schema.number(),
    topic_id: schema.number(),
  })

  public messages = {
    maxLength: '{{ field }} ne doit pas dépasser {{ options.maxLength }} caractères',
    minLength: '{{ field }} doit avoir au minimum {{ options.maxLength }} caractères',
  }
}

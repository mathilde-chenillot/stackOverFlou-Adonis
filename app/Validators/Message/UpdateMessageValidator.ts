import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateMessageValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    content: schema.string.optional({}, [rules.minLength(1), rules.maxLength(25)]),
    user_id: schema.number.optional(),
    topic_id: schema.number.optional(),
  })

  public messages = {
    maxLength: '{{ field }} ne doit pas dépasser {{ options.maxLength }} caractères',
    minLength: '{{ field }} doit avoir au minimum {{ options.maxLength }} caractères',
  }
}

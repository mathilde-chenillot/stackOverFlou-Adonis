import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Message from 'App/Models/Message'
import Topic from 'App/Models/Topic'
import CreateMessageValidator from 'App/Validators/Message/CreateMessageValidator'
import UpdateMessageValidator from 'App/Validators/Message/UpdateMessageValidator'

export default class MessagesController {
  // To read all

  public async index({ request, response }: HttpContextContract) {
    const message = await Message.all()
    return response.ok(message)
  }

  // To read one

  public async show({ request, response, params }: HttpContextContract) {
    const message = await Message.findOrFail(params.id)
    return response.ok(message)
  }

  // Create

  public async store({ request, response }: HttpContextContract) {
    const data = await request.validate(CreateMessageValidator)
    const message = await Message.create(data)
    return response.created(message)
  }

  // Update

  public async update({ request, response, params }: HttpContextContract) {
    const message = await Message.findOrFail(params.id)
    const data = await request.validate(UpdateMessageValidator)
    await message.merge(data).save()
    return response.ok(message)
  }

  // Delete

  public async destroy({ request, response, params }: HttpContextContract) {
    const message = await Message.findOrFail(params.id)
    await message.delete()
    return response.ok(message)
  }

  // Get all messages by topic

  public async getAllMessagesByTopic({ request, response, params }: HttpContextContract) {
    try {
      const message = await Message.query().where('topicId', params.topicId)
      return response.ok(message)
    } catch (error) {
      return response.send(error.message)
    }
  }
}

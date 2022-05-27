import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Topic from 'App/Models/Topic'
import CreatePostValidator from 'App/Validators/Post/CreatePostValidator'

export default class TopicsController {
  // To read all

  public async index({ request, response }: HttpContextContract) {
    const topics = await Topic.all()
    return response.ok(topics)
  }

  //To read one

  public async show({ request, response, params }: HttpContextContract) {
    const topics = await Topic.findOrFail(params.id)
    return response.ok(topics)
  }

  // to create

  public async store({ request, response }: HttpContextContract) {
    const data = await request.validate(CreatePostValidator)
    const topic = await Topic.create(data)
    return response.created(topic)
  }
}

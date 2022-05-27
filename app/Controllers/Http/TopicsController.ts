import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Topic from 'App/Models/Topic'
import CreatePostValidator from 'App/Validators/Post/CreatePostValidator'
import UpdateTopicValidator from 'App/Validators/Post/UpdateTopicValidator'

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

  // To create

  public async store({ request, response }: HttpContextContract) {
    const data = await request.validate(CreatePostValidator)
    const topic = await Topic.create(data)
    return response.created(topic)
  }

  // To update

  public async update({ request, response, params }: HttpContextContract) {
    const topic = await Topic.findOrFail(params.id)
    const data = await request.validate(UpdateTopicValidator)
    await topic.merge(data).save()
    return response.ok(topic)
  }
}

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Topic from 'App/Models/Topic'
import User from 'App/Models/User'

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
}

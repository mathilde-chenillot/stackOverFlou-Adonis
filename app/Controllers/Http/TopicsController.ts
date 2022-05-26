import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Topic from 'App/Models/Topic'

export default class TopicsController {
  // To read

  public async index({ request, response }: HttpContextContract) {
    const topics = await Topic.all()
    return response.ok(topics)
  }
}

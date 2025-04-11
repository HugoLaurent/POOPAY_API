import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'
import ToiletSession from '#models/toilet_session'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  public async run() {
    const users = await User.all()

    for (const user of users) {
      const hourlyRate = user.monthlySalary / user.monthlyHours
      const sessionCount = Math.floor(Math.random() * 400) + 3 // 3 à 10 sessions

      for (let i = 0; i < sessionCount; i++) {
        const randomDay = Math.floor(Math.random() * 30)
        const hour = 9 + Math.floor(Math.random() * 8) // 9h - 17h
        const minute = Math.floor(Math.random() * 60)
        const second = Math.floor(Math.random() * 60)

        const durationSec = Math.floor(Math.random() * 600) + 60 // entre 1min et 10min (60s à 660s)

        const startedAt = DateTime.now().minus({ days: randomDay }).set({
          hour,
          minute,
          second,
        })

        const endedAt = startedAt.plus({ seconds: durationSec })

        await ToiletSession.create({
          userId: user.id,
          startedAt,
          endedAt,
          durationSeconds: durationSec,
          earnedAmount: (durationSec / 3600) * hourlyRate,
        })
      }
    }

    console.log('💩 Sessions toilettes avec secondes précises créées !')
  }
}

import type { HttpContext } from '@adonisjs/core/http'
import ToiletSession from '#models/toilet_session'
import { DateTime } from 'luxon'

export default class HomeController {
  public async index({ auth }: HttpContext) {
    const authenticatedUser = auth.user!
    const currentDate = DateTime.now()

    const userSessions = await ToiletSession.query()
      .where('user_id', authenticatedUser.id)
      .orderBy('started_at', 'desc')

    const formatDurationToString = (seconds: number): string => {
      const minutes = Math.floor(seconds / 60)
      const remainingSeconds = Math.floor(seconds % 60)
      return `${minutes} min ${remainingSeconds} sec`
    }

    const formatCurrency = (amount: number): string => `${amount.toFixed(2)} €`

    const isSessionInPeriod = (sessionDate: DateTime, unit: 'day' | 'week' | 'month') =>
      sessionDate.hasSame(currentDate, unit)

    const getStatsForPeriod = (period: 'day' | 'week' | 'month') => {
      const filteredSessions = userSessions.filter((session) =>
        isSessionInPeriod(session.startedAt, period)
      )

      const totalSeconds = filteredSessions.reduce(
        (accumulator, session) => accumulator + Number(session.durationSeconds || 0),
        0
      )

      const totalEarnings = filteredSessions.reduce(
        (accumulator, session) => accumulator + Number(session.earnedAmount || 0),
        0
      )

      const estimatedWorkedHours =
        authenticatedUser.monthlyHours / (period === 'day' ? 20 : period === 'week' ? 4 : 1)

      return {
        time: formatDurationToString(totalSeconds),
        earned: formatCurrency(totalEarnings),
        work: `${estimatedWorkedHours}h`,
      }
    }

    return {
      user: {
        pseudo: authenticatedUser.username,
      },
      stats: {
        day: getStatsForPeriod('day'),
        week: getStatsForPeriod('week'),
        month: getStatsForPeriod('month'),
      },
      rankings: {
        private: '2e sur 5', // Placeholder temporaire
        city: '125e sur 880', // Placeholder temporaire
      },
    }
  }
}

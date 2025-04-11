import type { HttpContext } from '@adonisjs/core/http'
import ToiletSession from '#models/toilet_session'
import { DateTime } from 'luxon'

export default class HomeController {
  public async index({ auth }: HttpContext) {
    console.log('HomeController.index()')

    const user = auth.user!
    const now = DateTime.now().startOf('day')

    // Récupérer toutes les sessions de l'utilisateur, plus récentes en premier
    const userSession = await ToiletSession.query()
      .where('user_id', user.id)
      .orderBy('started_at', 'desc')

    // === UTILS ===

    const formatDuration = (seconds: number = 0): string => {
      const mins = Math.floor(seconds / 60)
      const secs = Math.floor(seconds % 60)
      return `${mins} min ${secs} sec`
    }

    const formatCurrency = (value: any): string => {
      const number = Number.parseFloat(String(value).trim())
      return Number.isNaN(number) ? '0.00 €' : `${number.toFixed(2)} €`
    }

    const getSessionsForPeriod = (unit: 'day' | 'week') => {
      return userSession.filter((session) => session.startedAt?.hasSame(now, unit))
    }

    const calculateStatsForPeriod = (sessionsSubset: ToiletSession[], unit: 'day' | 'week') => {
      const totalSeconds = sessionsSubset.reduce((sum, s) => sum + (s.durationSeconds ?? 0), 0)
      const totalEarnings = sessionsSubset.reduce((sum, s) => sum + (s.earnedAmount ?? 0), 0)

      const estimatedWorkHours = unit === 'day' ? user.monthlyHours / 20 : user.monthlyHours / 4

      return {
        time: formatDuration(totalSeconds),
        earned: formatCurrency(totalEarnings),
        work: unit === 'day' ? `${estimatedWorkHours}h` : undefined,
      }
    }

    // === STATS ===

    const todaySessions = getSessionsForPeriod('day')
    const weekSessions = getSessionsForPeriod('week')

    const stats = {
      day: calculateStatsForPeriod(todaySessions, 'day'),
      week: calculateStatsForPeriod(weekSessions, 'week'),
    }

    // === STREAK ===

    const sevenDaysAgo = now.minus({ days: 7 })

    // Filtrer les sessions dans les 7 derniers jours
    const sessionsLast7Days = userSession.filter(
      (session) => session.startedAt && session.startedAt > sevenDaysAgo && session.startedAt < now
    )

    // Nombre de sessions dans les 7 derniers jours
    const streak = sessionsLast7Days.length

    // === DERNIERS PASSAGES ===

    const latestLogs = userSession.slice(0, 20).map((session) => ({
      id: session.id,
      date: session.startedAt?.toISODate() ?? null,
      time: session.startedAt?.toFormat('HH:mm') ?? '--:--',
      duration: Math.round((session.durationSeconds ?? 0) / 60),
      earned: formatCurrency(session.earnedAmount),
    }))

    // === RÉSULTAT FINAL ===

    return {
      user: {
        pseudo: user.username,
      },
      stats,
      streak,
      logs: latestLogs,
    }
  }

  public async byDate({ auth, params, response }: HttpContext) {
    const user = auth.user!
    const { date } = params

    // Vérifier que la date est valide
    const selectedDate = DateTime.fromISO(date)
    if (!selectedDate.isValid) {
      return response.badRequest({ error: 'Date invalide' })
    }

    const sessions = await ToiletSession.query()
      .where('user_id', user.id)
      .andWhereRaw('DATE(started_at) = ?', [selectedDate.toISODate()])
      .orderBy('started_at', 'asc')

    const formatDuration = (seconds: number = 0) => {
      const mins = Math.floor(seconds / 60)
      const secs = Math.floor(seconds % 60)
      return `${mins} min ${secs} sec`
    }

    const formatMoney = (value: any) => {
      const number = Number.parseFloat(String(value).trim())
      return Number.isNaN(number) ? '0.00 €' : `${number.toFixed(2)} €`
    }

    const totalSeconds = sessions.reduce((acc, s) => acc + (s.durationSeconds ?? 0), 0)
    const totalEarnings = sessions.reduce((acc, s) => acc + (s.earnedAmount ?? 0), 0)

    const estimatedWorkHours = user.monthlyHours / 20

    const stats = {
      time: formatDuration(totalSeconds),
      earned: formatMoney(totalEarnings),
      work: `${estimatedWorkHours}h`,
    }

    const logs = sessions.map((s) => ({
      id: s.id,
      date: s.startedAt?.toISODate() ?? null,
      time: s.startedAt?.toFormat('HH:mm') ?? '--:--',
      duration: Math.round((s.durationSeconds ?? 0) / 60),
      earned: formatMoney(s.earnedAmount),
    }))

    return {
      user: {
        pseudo: user.username,
      },
      stats,
      logs,
    }
  }
}

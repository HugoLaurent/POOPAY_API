import type { HttpContext } from '@adonisjs/core/http'
import ToiletSession from '#models/toilet_session'
import User from '#models/user'

export default class RankingController {
  public async index({ auth }: HttpContext) {
    const user = await User.query()
      .where('id', auth.user!.id)
      .preload('salaryRange')
      .preload('ageRange')
      .preload('employmentStatus') // attention au nom exact du modèle
      .preload('sector')
      .firstOrFail()

    console.log('User:', user)

    const formatUser = (user, total) => ({
      pseudo: user.username,
      earned: total,
      id: user.id,
    })

    const calculateTotalEarned = async (userId: number) => {
      const sessions = await ToiletSession.query().where('user_id', userId)
      return sessions.reduce((acc, s) => acc + Number(s.earnedAmount || 0), 0)
    }

    const getTopRanking = async (users: User[], currentUserId: number) => {
      const rankedUsers = await Promise.all(
        users.map(async (u) => {
          const earned = await calculateTotalEarned(u.id)
          return formatUser(u, earned)
        })
      )

      const sorted = rankedUsers.sort((a, b) => b.earned - a.earned)
      const top3 = sorted.slice(0, 3)
      const position = sorted.findIndex((u) => u.id === currentUserId) + 1

      return { top3, position }
    }

    const allUsers = await User.all()
    const usersInAge = await User.query().where('age_range_id', user.ageRangeId)
    const usersInSector = await User.query().where('sector_id', user.sectorId)
    const usersInStatus = await User.query().where('status_id', user.statusId)

    const globalRanking = await getTopRanking(allUsers, user.id)
    const ageRanking = await getTopRanking(usersInAge, user.id)
    const sectorRanking = await getTopRanking(usersInSector, user.id)
    const statusRanking = await getTopRanking(usersInStatus, user.id)

    const totalEarned = await calculateTotalEarned(user.id)

    return {
      user: {
        pseudo: user.username,
        earned: totalEarned,
        position: {
          global: globalRanking.position,
          ageRange: ageRanking.position,
          sector: sectorRanking.position,
          status: statusRanking.position,
        },
      },
      rankings: {
        ageRange: {
          label: user.ageRange?.label || 'Tranche inconnue',
          users: ageRanking.top3,
        },
        sector: {
          label: user.sector?.name || 'Secteur inconnu',
          users: sectorRanking.top3,
        },
        status: {
          label: user.employmentStatus?.name || 'Statut inconnu',
          users: statusRanking.top3,
        },
        salaryRange: {
          label: user.salaryRange?.label || 'Salaire inconnu',
        },
      },
    }
  }
}

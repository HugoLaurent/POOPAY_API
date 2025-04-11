import User from '#models/user'
import { test } from '@japa/runner'

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

test.group('🚽 Users list 💩', () => {
  test('🧻 Récupère la liste des utilisateurs', async ({ client }) => {
    console.log('\n========= 🧻 ÉTAPE 1 – Connexion au serveur Poopay =========')
    console.log('📡 Initialisation...')
    console.log('🧻 Récupération de la liste des maîtres du trône... 👑🚽')

    await sleep(500)
    const response = await client.get('/users')
    response.assertStatus(200)

    console.log('✅ Liste récupérée avec succès 💾💩')
  })

  test('🧍💼 Création, modification, connexion et suppression d’un utilisateur testeur de toilettes', async ({
    client,
  }) => {
    // ==== Étape 2 : Création de l'utilisateur ====
    console.log('\n========= 🧍💼 ÉTAPE 2 – Création d’un utilisateur testeur =========')
    const user = new User()
    user.username = 'testuser2'
    user.password = 'secretpassword'
    user.age = 25
    user.postalCode = '12345'
    user.monthlySalary = 3000
    user.monthlyHours = 40
    user.sectorId = 1
    user.statusId = 1

    await user.save()
    await sleep(300)

    console.log(`✅ Utilisateur créé : ${user.username}`)
    console.log('💰 L’utilisateur est prêt à rentabiliser chaque passage !')

    // ==== Étape 3 : Mise à jour de l'utilisateur ====
    console.log('\n========= 🔐 ÉTAPE 3 – Modification du profil testeur =========')
    const updatedUser = await User.findBy('username', user.username)
    if (!updatedUser) {
      throw new Error('❌ Utilisateur introuvable – impossible de procéder à l’update !')
    }

    console.log('🔍 Profil actuel :')
    console.log(
      `🆔 ID : ${updatedUser.id} | 👴 Âge : ${updatedUser.age} | 💸 Salaire : ${updatedUser.monthlySalary} € | 🕒 Heures : ${updatedUser.monthlyHours}`
    )

    updatedUser.age = 76
    updatedUser.postalCode = '54321'
    updatedUser.monthlySalary = 1200
    updatedUser.monthlyHours = 60
    updatedUser.sectorId = 11
    updatedUser.statusId = 11
    await updatedUser.save()

    console.log('✅ Mise à jour effectuée !')
    console.log(
      `🆔 ID : ${updatedUser.id} | 🆕 Profil : 👴 Âge : ${updatedUser.age} | 💸 Salaire : ${updatedUser.monthlySalary} € | 🕒 Heures : ${updatedUser.monthlyHours}`
    )

    await sleep(300)

    // ==== Étape 4 : Connexion ====
    console.log('\n========= 🔐 ÉTAPE 4 – Connexion du testeur =========')
    console.log('🔍 Vérification des identifiants...')

    const loginResponse = await client
      .post('/session')
      .json({ username: user.username, password: 'secretpassword' })

    console.log('🧾 Réponse du serveur :', loginResponse.body())
    loginResponse.assertStatus(200)

    console.log(`🔑 Connexion réussie pour ${user.username}`)
    console.log('👑 Trône sécurisé – prêt à générer des 💩-profits')

    await sleep(300)

    // ==== Étape 5 : Nettoyage ====
    console.log('\n========= 🧹 ÉTAPE 5 – Suppression du testeur =========')
    await user.delete()
    console.log(`✅ ${user.username} supprimé – mission trônale accomplie 🫡🚽`)
  })
})

/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const CompteController = () => import('#controllers/compte_controller')
const SessionController = () => import('#controllers/session_controller')
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
import Sector from '#models/sector'
import EmploymentStatus from '#models/employment_status'
const SignInController = () => import('#controllers/sign_in_controller')

router.post('/session', [SessionController, 'store'])
router.delete('/session', [SessionController, 'destroy']).use(middleware.auth({ guards: ['api'] }))

router.post('/register', [SignInController, 'register'])

router.get('/me', [CompteController, 'show']).use(middleware.auth({ guards: ['api'] }))

router.get('/sectors', async () => {
  const sectors = await Sector.all()
  return sectors
})

router.get('/statuses', async () => {
  const statuses = await EmploymentStatus.all()
  return statuses
})

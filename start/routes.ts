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
const UsersController = () => import('#controllers/users_controller')
const HomeController = () => import('#controllers/home_controller')
const SignInController = () => import('#controllers/sign_in_controller')

//ROUTER FOR THE API

// ROUTER FOR THE SESSION
router.post('/session', [SessionController, 'store'])
router.delete('/session', [SessionController, 'destroy']).use(middleware.auth({ guards: ['api'] }))

// ROUTER FOR THE SIGN IN
router.post('/register', [SignInController, 'register'])

// ROUTER FOR THE HOMEPAGE
router.get('/home', [HomeController, 'index']).use(middleware.auth({ guards: ['api'] }))

// ROUTER FOR THE COMPTE
router.get('/me', [CompteController, 'show']).use(middleware.auth({ guards: ['api'] }))

// ROUTER FOR THE USER
router.get('/users', [UsersController, 'index'])

// ROUTER FOR DIVERS DATA
router.get('/sectors', async () => {
  const sectors = await Sector.all()
  return sectors
})

router.get('/statuses', async () => {
  const statuses = await EmploymentStatus.all()
  return statuses
})

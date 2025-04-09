import User from '#models/user'
import { test } from '@japa/runner'

test.group('Users list', () => {
  test('get a list of users', async () => {
    const user = await User.query()
    console.log(user.length)
  })

  test('add a user', async ({}) => {
    const user = new User()
    user.username = 'testuser2'
    user.password = 'secret'
    user.age = 25
    user.postalCode = '12345'
    user.monthlySalary = 3000
    user.monthlyHours = 40
    user.sectorId = 1
    user.statusId = 1

    await user.save()

    console.log('User created:', user.username)

    await user.delete()

    console.log('User deleted:', user.username)
  })
})

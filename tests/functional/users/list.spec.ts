import { test } from '@japa/runner'

import User from '#models/user'
import hash from '@adonisjs/core/services/hash'

test('hashes user password when creating a new user', async ({ assert }) => {
  const user = new User()
  user.password = 'secret'

  await user.save()

  assert.isTrue(hash.isValidHash(user.password))
  assert.isTrue(await hash.verify(user.password, 'secret'))
})

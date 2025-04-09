import vine from '@vinejs/vine'

export const SessionValidator = vine.compile(
  vine.object({
    username: vine.string(),
    password: vine.string().minLength(8),
  })
)

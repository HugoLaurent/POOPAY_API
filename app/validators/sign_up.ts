import vine from '@vinejs/vine'

export const SignUpValidator = vine.compile(
  vine.object({
    username: vine.string().unique({
      table: 'users',
      column: 'username',
    }),
    password: vine.string().minLength(8),
    age: vine.number().min(13).max(99),
    postalCode: vine.string().regex(/^\d{5}$/),
    monthlySalary: vine.number().min(0).max(100000),
    monthlyHours: vine.number().min(0).max(720),
    sectorId: vine.number().exists({
      table: 'sectors',
      column: 'id',
    }),
    statusId: vine.number().exists({
      table: 'employment_statuses',
      column: 'id',
    }),
  })
)

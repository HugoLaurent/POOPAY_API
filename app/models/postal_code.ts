import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class PostalCode extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare codePostal: string

  @column()
  declare nomCommune: string
}

import vine, { SimpleMessagesProvider } from '@vinejs/vine'

vine.messagesProvider = new SimpleMessagesProvider({
  //POUR LA SESSION
  'username.required': "Le nom d'utilisateur est requis",
  'password.required': 'Le mot de passe est requis',
  'password.minLength': 'Le mot de passe doit contenir au moins 8 caractères',

  //POUR L'INSCRIPTION
  'database.unique': "Ce nom d'utilisateur est déjà pris",
  'username.minLength': "Le nom d'utilisateur doit contenir au moins 3 caractères",
  'username.maxLength': "Le nom d'utilisateur ne doit pas dépasser 20 caractères",
  'age.required': "L'âge est requis",
  'age.min': "L'âge doit être supérieur ou égal à 16 ans",
  'age.max': "L'âge doit être inférieur ou égal à 99 ans",
  'postalCode.required': 'Le code postal est requis',
  'postalCode.regex': 'Le code postal doit être au format XXXXX (5 chiffres)',
  'monthlySalary.required': 'Le salaire mensuel est requis',
  'monthlySalary.min': 'Le salaire mensuel doit être supérieur ou égal à 0',
  'monthlySalary.max': 'Le salaire mensuel doit être inférieur ou égal à 100000',
  'monthlyHours.required': "Le nombre d'heures mensuelles est requis",
  'monthlyHours.min': "Le nombre d'heures mensuelles doit être supérieur ou égal à 0",
  'monthlyHours.max': "Le nombre d'heures mensuelles doit être inférieur ou égal à 720",
  'database.exist': "L'ID de secteur ou de statut n'existe pas",
})

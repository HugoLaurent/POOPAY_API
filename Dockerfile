# Étape de base commune
FROM node:22.16.0-alpine3.22 AS base
WORKDIR /app

# Étape d'installation des dépendances (avec devDeps pour builder)
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

# Étape de build
FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Étape de production : uniquement le nécessaire
FROM base AS production
ENV NODE_ENV=production
WORKDIR /app


# Copie les modules sans les devDeps
COPY --from=deps /app/package.json /app/package-lock.json ./
RUN npm ci --omit=dev

# Copie uniquement le build transpilé
COPY --from=build /app/build ./build
COPY .env .env



EXPOSE 8080

# Lancer le JS transpilé
CMD ["node", "build/bin/server.js"]

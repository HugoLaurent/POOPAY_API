FROM node:22

WORKDIR /app

COPY . .

RUN npm install

# Port par défaut en dev
EXPOSE 3333

# Lancement en mode dev (hot reload)
CMD ["node", "ace", "serve", "--watch"]

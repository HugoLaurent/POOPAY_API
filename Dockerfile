FROM node:22

WORKDIR /app

COPY . .

RUN apt-get update && apt-get install -y postgresql-client && apt-get install iputils-ping -y
RUN npm install

# Port par défaut en dev
EXPOSE 3333

# Lancement en mode dev (hot reload)
CMD ["node", "ace", "build"]

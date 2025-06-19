FROM node:22

WORKDIR /app

COPY . .

RUN npm i ts-node -D
RUN npm install
RUN apt-get update && apt-get install -y postgresql-client && apt-get install iputils-ping -y

# Port par défaut en dev
EXPOSE 3333

# Lancement en mode dev (hot reload)
CMD ["node", "ace", "build"]

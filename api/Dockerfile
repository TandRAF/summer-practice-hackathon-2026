# Stage 1: Build
FROM node:20-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Aici se generează folderul /app/dist
RUN npm run build 

# Stage 2: Runtime
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
# Instalăm doar dependențele de producție
RUN npm install --production
# CRITIC: Copiem folderul dist din etapa de build!
COPY --from=build /app/dist ./dist 

# Heroku are nevoie de variabila PORT
CMD ["node", "dist/index.js"]
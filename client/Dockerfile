
FROM node:20-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa 2: Servire
FROM nginx:alpine

# Copiem fișierele din /dist
COPY --from=build /app/dist /usr/share/nginx/html

# Creăm un fișier template și folosim CMD pentru a înlocui portul la runtime.
COPY --from=build /app/dist /usr/share/nginx/html

CMD sh -c "echo 'server { listen ${PORT:-80}; location / { root /usr/share/nginx/html; index index.html; try_files \$uri \$uri/ /index.html; } }' > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"
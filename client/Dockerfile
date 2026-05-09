FROM node:20-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Pasăm URL-ul aici. Dacă nu îl dai la build, va fi gol.
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
# Configurație minimală pentru React Router
CMD sh -c "echo 'server { listen ${PORT:-80}; location / { root /usr/share/nginx/html; index index.html; try_files \$uri \$uri/ /index.html; } }' > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"
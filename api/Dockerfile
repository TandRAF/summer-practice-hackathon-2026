# Imaginea de bază stabilă
FROM node:20-alpine

# Setăm folderul de lucru în container
WORKDIR /app

# Copiem fișierele de dependențe
COPY package*.json ./

# Instalăm dependențele de producție
RUN npm install

# Copiem restul codului sursă
COPY . .

# Compilăm codul TypeScript
RUN npm run build

# Comanda de start pentru producție
CMD ["npm", "start"]
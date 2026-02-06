# Étape 1 : Construction du projet
FROM node:20-alpine AS build
WORKDIR /app

# Installation des dépendances
COPY package.json package-lock.json ./
RUN npm install

# Copie du code source et build
COPY . .
RUN npm run build

# Étape 2 : Serveur de production (Nginx)
FROM nginx:stable-alpine
# Copie des fichiers compilés vers Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Ajout d'une config Nginx pour gérer le routage React (SPA)
RUN echo 'server { \
    listen 80; \
    location / { \
        root /usr/share/nginx/html; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

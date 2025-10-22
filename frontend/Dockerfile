# ============================
# 1️⃣ Build stage (Angular)
# ============================
FROM node:20-alpine AS build
WORKDIR /app

# Copier package files et installer les dépendances
COPY package*.json ./
RUN npm ci

# Copier le code source
COPY . .

# Compiler l’application Angular
RUN npm run build -- --configuration=production

# ============================
# 2️⃣ Serve stage (Nginx)
# ============================
FROM nginx:1.27-alpine
WORKDIR /usr/share/nginx/html

# Copier les fichiers compilés du build Angular
COPY --from=build /app/dist/ /usr/share/nginx/html

# Supprimer la config Nginx par défaut et ajouter la nôtre
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exposer le port 80
EXPOSE 80

# Lancer Nginx
CMD ["nginx", "-g", "daemon off;"]

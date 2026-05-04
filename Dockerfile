# ---- Stage 1: Build ----
FROM node:20-alpine AS build

WORKDIR /app

# Copiamos dependencias
COPY package*.json ./
RUN npm install

# Copiamos el código
COPY . .

# Build de Angular
RUN npm run build -- --configuration production

# ---- Stage 2: Runtime ----
FROM nginx:alpine

# Borramos config default
RUN rm -rf /usr/share/nginx/html/*

# Copiamos build generado
COPY --from=build /app/dist/srgs_frontend/browser /usr/share/nginx/html

# Copiar config nginx (opcional pero recomendado)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
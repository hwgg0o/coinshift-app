# Etapa 1: Build
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
# Usamos ci para una instalación más limpia y rápida
RUN npm ci 
COPY . .
RUN npm run build --configuration=production

# Etapa 2: Server
FROM nginx:stable-alpine
# IMPORTANTE: Verifica si tu carpeta de salida es /dist/coinshift-app/browser
COPY --from=build /app/dist/coinshift-app/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
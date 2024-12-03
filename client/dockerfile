# Stage 1: Build
FROM node:18 AS build
WORKDIR /app

# Устанавливаем зависимости
COPY package.json package-lock.json ./
RUN npm install

# Копируем исходный код и собираем приложение
COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Копируем собранное приложение
COPY --from=build /app/build /usr/share/nginx/html

# Копируем кастомный Nginx конфиг для HTTPS
COPY nginx.conf /etc/nginx/conf.d/default.conf
  
# Указываем порт HTTPS
EXPOSE 443
   
# Запуск Nginx
CMD ["nginx", "-g", "daemon off;"]
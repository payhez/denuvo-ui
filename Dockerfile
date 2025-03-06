FROM node:18-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build
#RUN npm run build -- --configuration=docker

FROM nginx:alpine
COPY --from=builder /app/dist/denuvo-ui/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
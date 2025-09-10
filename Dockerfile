# Stage 1: Build
FROM node:20-alpine AS build

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci || npm install

COPY . .
RUN npm run build

# Stage 2: Serve static files with nginx (Cloud Run compatible)
FROM nginx:alpine

# Copy built assets
COPY --from=build /app/dist /usr/share/nginx/html

# Use a template that reads $PORT at runtime
RUN mkdir -p /etc/nginx/templates
COPY nginx.conf.template /etc/nginx/templates/default.conf.template

ENV PORT=8080

EXPOSE 8080
CMD ["/bin/sh", "-c", "envsubst < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'" ]

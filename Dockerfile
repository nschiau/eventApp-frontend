# Frontend Dockerfile
# ---- Build React app ----
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build:prod

# ---- Serve with nginx ----
FROM nginx:alpine

# Clean default nginx setup
RUN rm -rf /usr/share/nginx/html/* /etc/nginx/conf.d/default.conf

# Copy built files
COPY --from=build /app/dist /usr/share/nginx/html
COPY attached_assets/stock_images /usr/share/nginx/html/attached_assets/stock_images
COPY nginx.conf /etc/nginx/conf.d/default.conf

# --- Runtime env injection support ---
# Add the env template
COPY env.template.js /usr/share/nginx/html/env.template.js

# Copy and setup entrypoint
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

EXPOSE 80
ENTRYPOINT ["/docker-entrypoint.sh"]
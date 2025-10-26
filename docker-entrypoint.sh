#!/bin/sh

# Install envsubst if not present
apk add --no-cache gettext

# Replace env vars in frontend template
envsubst < /usr/share/nginx/html/env.template.js > /usr/share/nginx/html/env.js

# If NGINX_API_URL is not set, disable the proxy config
if [ -z "$NGINX_API_URL" ]; then
    # Create a simple nginx config without proxy
    cat > /etc/nginx/conf.d/default.conf << EOF
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files \$uri \$uri/ /index.html;
        add_header Cache-Control "no-cache, no-store, must-revalidate";
        add_header Pragma "no-cache";
        add_header Expires "0";
    }

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
EOF
else
    # Use the template with proxy configuration
    envsubst '$NGINX_API_URL' < /etc/nginx/conf.d/nginx.conf.template > /etc/nginx/conf.d/default.conf
fi

# Start nginx
exec nginx -g "daemon off;"
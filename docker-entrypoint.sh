#!/bin/sh

# Install envsubst if not present
apk add --no-cache gettext

# Replace env vars in template and output to env.js
envsubst < /usr/share/nginx/html/env.template.js > /usr/share/nginx/html/env.js

# Start nginx
exec nginx -g "daemon off;"
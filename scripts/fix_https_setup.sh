#!/bin/bash

# Script to fix the HTTPS certificate error
# This script should be run as root or with sudo

# Check if running as root
if [ "$(id -u)" -ne 0 ]; then
    echo "This script must be run as root or with sudo"
    exit 1
fi

# Variables
NGINX_CONF_PATH="/etc/nginx/sites-available/clarc2025.conf"
NGINX_ENABLED_PATH="/etc/nginx/sites-enabled/clarc2025.conf"
DOMAIN="clarc2025.cji.uniri.hr"
APP_PORT="9003"

# Create HTTP config
echo "Creating HTTP-only Nginx configuration..."
cat > $NGINX_CONF_PATH << EOF
server {
    listen 80;
    server_name $DOMAIN;
    
    location / {
        proxy_pass http://localhost:$APP_PORT;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

# Create symlink if it doesn't exist
if [ ! -f "$NGINX_ENABLED_PATH" ]; then
    ln -s $NGINX_CONF_PATH $NGINX_ENABLED_PATH
fi

# Test and reload Nginx
echo "Testing HTTP Nginx configuration..."
nginx -t && systemctl reload nginx

echo "HTTP configuration has been set up successfully."
echo "Now you can run Let's Encrypt to obtain certificates:"
echo "sudo certbot --nginx -d $DOMAIN"
echo ""
echo "Or if you have existing certificates, copy them to /etc/nginx/ssl/ and then run the original setup script again." 
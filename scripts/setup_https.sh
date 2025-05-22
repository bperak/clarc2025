#!/bin/bash

# Script to set up HTTPS for CLARC 2025 application
# This script should be run as root or with sudo

# Exit on error
set -e

# Variables
NGINX_CONF_PATH="/etc/nginx/sites-available/clarc2025.conf"
NGINX_ENABLED_PATH="/etc/nginx/sites-enabled/clarc2025.conf"
SSL_DIR="/etc/nginx/ssl"
DOMAIN="clarc2025.cji.uniri.hr"
APP_PORT="9003"

# Check if running as root
if [ "$(id -u)" -ne 0 ]; then
    echo "This script must be run as root or with sudo"
    exit 1
fi

# Create directories
mkdir -p $SSL_DIR

# Setup HTTP Nginx config first (for Let's Encrypt)
cat > /home/Liks/clarc2025/nginx/clarc2025-http.conf << EOF
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

# Display menu for certificate choice
echo "Choose SSL certificate option:"
echo "1) Use Let's Encrypt (recommended)"
echo "2) Use existing certificate files"
read -p "Option [1-2]: " CERT_OPTION

case $CERT_OPTION in
    1)
        # For Let's Encrypt, we need to use the HTTP config first
        cp /home/Liks/clarc2025/nginx/clarc2025-http.conf $NGINX_CONF_PATH
        
        # Create symlink if it doesn't exist
        if [ ! -f "$NGINX_ENABLED_PATH" ]; then
            ln -s $NGINX_CONF_PATH $NGINX_ENABLED_PATH
        fi
        
        # Test and reload Nginx with HTTP config
        echo "Testing HTTP Nginx configuration..."
        nginx -t && systemctl reload nginx
        
        # Install Certbot if not already installed
        if ! command -v certbot &> /dev/null; then
            echo "Installing Certbot..."
            apt update
            apt install -y certbot python3-certbot-nginx
        fi
        
        # Get certificate from Let's Encrypt (this will modify the Nginx config)
        echo "Obtaining certificate from Let's Encrypt..."
        certbot --nginx -d $DOMAIN
        ;;
    2)
        # Ask for certificate file paths
        read -p "Path to certificate file (.crt): " CERT_PATH
        read -p "Path to private key file (.key): " KEY_PATH
        
        # Copy certificate files
        echo "Copying certificate files..."
        cp $CERT_PATH $SSL_DIR/clarc2025.crt
        cp $KEY_PATH $SSL_DIR/clarc2025.key
        
        # Set proper permissions
        chmod 644 $SSL_DIR/clarc2025.crt
        chmod 600 $SSL_DIR/clarc2025.key
        
        # Create HTTPS Nginx config
        cat > /home/Liks/clarc2025/nginx/clarc2025.conf << EOF
server {
    listen 80;
    server_name $DOMAIN;
    
    # Redirect all HTTP requests to HTTPS
    location / {
        return 301 https://\$host\$request_uri;
    }
}

server {
    listen 443 ssl;
    server_name $DOMAIN;

    # SSL certificate configuration
    ssl_certificate $SSL_DIR/clarc2025.crt;
    ssl_certificate_key $SSL_DIR/clarc2025.key;
    
    # SSL settings
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;
    ssl_ciphers 'ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384';
    ssl_session_timeout 1d;
    ssl_session_cache shared:SSL:10m;
    ssl_session_tickets off;
    
    # HSTS configuration
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # Proxy configuration
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
        proxy_buffering off;
    }
}
EOF

        # Copy config and create symlink
        cp /home/Liks/clarc2025/nginx/clarc2025.conf $NGINX_CONF_PATH
        if [ ! -f "$NGINX_ENABLED_PATH" ]; then
            ln -s $NGINX_CONF_PATH $NGINX_ENABLED_PATH
        fi
        
        # Test and reload Nginx
        echo "Testing HTTPS Nginx configuration..."
        nginx -t && systemctl reload nginx
        ;;
    *)
        echo "Invalid option. Exiting."
        exit 1
        ;;
esac

# Configure firewall (if UFW is installed)
if command -v ufw &> /dev/null; then
    echo "Configuring firewall..."
    ufw allow 'Nginx Full'
fi

echo "HTTPS setup completed for $DOMAIN"
echo "Please ensure that DNS records for $DOMAIN point to this server's IP address."
echo "You can test the connection by visiting https://$DOMAIN" 
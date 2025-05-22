# Setting up HTTPS for CLARC 2025

This document outlines the steps to configure HTTPS access to the CLARC 2025 application through clarc2025.cji.uniri.hr while it's hosted on liks.ffri.hr:9003.

## Prerequisites

- Nginx installed on the liks.ffri.hr server
- SSL certificate for clarc2025.cji.uniri.hr
- Root or sudo access to the server

## Steps

### 1. Obtain an SSL Certificate

#### Option 1: Let's Encrypt (Recommended)

1. Set up Nginx with HTTP configuration first:
   ```bash
   # Create a basic HTTP configuration
   sudo nano /etc/nginx/sites-available/clarc2025.conf
   ```

   Add the following content:
   ```
   server {
       listen 80;
       server_name clarc2025.cji.uniri.hr;
       
       location / {
           proxy_pass http://localhost:9003;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

2. Enable the site and reload Nginx:
   ```bash
   sudo ln -s /etc/nginx/sites-available/clarc2025.conf /etc/nginx/sites-enabled/
   sudo nginx -t && sudo systemctl reload nginx
   ```

3. Install Certbot:
   ```bash
   sudo apt update
   sudo apt install certbot python3-certbot-nginx
   ```

4. Generate the certificate:
   ```bash
   sudo certbot --nginx -d clarc2025.cji.uniri.hr
   ```

5. Follow the prompts to complete the certificate installation. Certbot will automatically modify your Nginx configuration to use HTTPS.

#### Option 2: Use an Existing Certificate

If you already have an SSL certificate for clarc2025.cji.uniri.hr, place the files in the appropriate location:

1. Create a directory for the certificates:
   ```bash
   sudo mkdir -p /etc/nginx/ssl
   ```

2. Copy your certificate files:
   ```bash
   sudo cp /path/to/your/certificate.crt /etc/nginx/ssl/clarc2025.crt
   sudo cp /path/to/your/private.key /etc/nginx/ssl/clarc2025.key
   ```

3. Ensure the files have appropriate permissions:
   ```bash
   sudo chmod 644 /etc/nginx/ssl/clarc2025.crt
   sudo chmod 600 /etc/nginx/ssl/clarc2025.key
   ```

### 2. Configure Nginx

1. Copy the Nginx configuration file to the appropriate location:
   ```bash
   sudo cp /home/Liks/clarc2025/nginx/clarc2025.conf /etc/nginx/sites-available/
   ```

2. Create a symbolic link to enable the site:
   ```bash
   sudo ln -s /etc/nginx/sites-available/clarc2025.conf /etc/nginx/sites-enabled/
   ```

3. Test the Nginx configuration:
   ```bash
   sudo nginx -t
   ```

4. If the test is successful, restart Nginx:
   ```bash
   sudo systemctl restart nginx
   ```

### 3. DNS Configuration

Ensure that the DNS record for clarc2025.cji.uniri.hr points to the IP address of the liks.ffri.hr server.

1. Add an A record in the DNS configuration for cji.uniri.hr:
   - Type: A
   - Name: clarc2025
   - Value: [IP address of liks.ffri.hr]
   - TTL: 3600 (or as appropriate)

### 4. Testing

1. After the DNS propagates, test the HTTPS connection by visiting:
   ```
   https://clarc2025.cji.uniri.hr
   ```

2. Verify that the connection is secure and that the application loads correctly.

## Troubleshooting

### Certificate Issues

- If you encounter certificate validation issues, ensure the certificate chain is complete.
- For Let's Encrypt certificates, you can renew them manually:
  ```bash
  sudo certbot renew --dry-run
  ```
  
- If you see an error like `cannot load certificate "/etc/nginx/ssl/clarc2025.crt": BIO_new_file() failed`, it means the certificate files don't exist at the specified location. Make sure to:
  - For Let's Encrypt: Set up HTTP first, then run certbot to get certificates
  - For existing certificates: Verify the certificate files are correctly copied to the specified locations

### Connection Problems

- Check the Nginx error logs:
  ```bash
  sudo tail -f /var/log/nginx/error.log
  ```

- Verify that port 443 is open in the firewall:
  ```bash
  sudo ufw status
  ```

- If needed, allow HTTPS traffic:
  ```bash
  sudo ufw allow 'Nginx Full'
  ```

### Application Not Loading

- Ensure the Next.js application is running on port 9003:
  ```bash
  pm2 status # if using PM2
  # or
  ps aux | grep node
  ```

- Check if the application can be accessed directly on the server:
  ```bash
  curl http://localhost:9003
  ```

## Maintenance

### Certificate Renewal

If using Let's Encrypt, certificates will automatically renew if Certbot is set up with a cron job. Verify that automatic renewal is configured:

```bash
sudo systemctl status certbot.timer
```

If not configured, set up a cron job to check for renewal twice daily:

```bash
echo "0 0,12 * * * root python3 -c 'import random; import time; time.sleep(random.random() * 3600)' && certbot renew -q" | sudo tee -a /etc/crontab > /dev/null
``` 
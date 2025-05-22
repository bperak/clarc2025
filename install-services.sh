#!/bin/bash

# Make sure we're running as sudo
if [ "$EUID" -ne 0 ]; then
  echo "Please run as root (use sudo)"
  exit 1
fi

# Copy service files to systemd directory
echo "Installing service files..."
cp lightrag-9000.service /etc/systemd/system/
cp app-9003.service /etc/systemd/system/

# Reload systemd to recognize new services
echo "Reloading systemd..."
systemctl daemon-reload

# Enable and start services
echo "Enabling services to start on boot..."
systemctl enable lightrag-9000.service
systemctl enable app-9003.service

echo "Starting services..."
systemctl start lightrag-9000.service
systemctl start app-9003.service

# Check status
echo "Service status for LightRAG on port 9000:"
systemctl status lightrag-9000.service
echo "Service status for CLARC 2025 Next.js App on port 9003:"
systemctl status app-9003.service

echo "Setup complete! Services will now run persistently and restart on reboot."
echo "- CLARC 2025 App available at: http://clarc2025.cji.uniri.hr/ (port 9003)"
echo "- LightRAG available at port 9000" 
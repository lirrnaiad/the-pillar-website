#!/bin/bash

# Deployment script for The Pillar Frontend
# Run this on your DigitalOcean Droplet

set -e

echo "🚀 Deploying The Pillar Frontend..."

# Configuration
FRONTEND_PORT=${FRONTEND_PORT:-80}
API_URL="http://174.138.17.108:8080/api"
IMAGE_NAME="the-pillar-frontend"
CONTAINER_NAME="the-pillar-frontend"

# Navigate to frontend directory
cd "$(dirname "$0")"

echo "📦 Building Docker image..."
docker build \
  --build-arg VITE_API_URL=$API_URL \
  -t $IMAGE_NAME \
  .

echo "🛑 Stopping existing container (if any)..."
docker stop $CONTAINER_NAME 2>/dev/null || true
docker rm $CONTAINER_NAME 2>/dev/null || true

echo "▶️  Starting new container..."
docker run -d \
  --name $CONTAINER_NAME \
  -p $FRONTEND_PORT:80 \
  --restart unless-stopped \
  $IMAGE_NAME

echo "✅ Frontend deployed successfully!"
echo ""
echo "🌐 Frontend available at: http://$(hostname -I | awk '{print $1}'):$FRONTEND_PORT"
echo "   Or: http://174.138.17.108:$FRONTEND_PORT"
echo ""
echo "📋 Container status:"
docker ps | grep $CONTAINER_NAME


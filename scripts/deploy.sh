#!/bin/bash

# Deploy script for IDE Negócios Digitais
set -e

echo "🚀 Starting deployment process..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    print_error "Docker is not running. Please start Docker and try again."
    exit 1
fi

# Check if .env file exists
if [ ! -f .env ]; then
    print_warning ".env file not found. Creating from env.example..."
    cp env.example .env
    print_warning "Please update .env file with your actual values before deploying."
fi

# Build the application
print_status "Building the application..."
npm run build

# Build Docker image
print_status "Building Docker image..."
docker build -f Dockerfile.production -t ide-negocios-digitais:latest .

# Stop existing container if running
print_status "Stopping existing container..."
docker-compose down || true

# Start the application
print_status "Starting the application..."
docker-compose up -d

# Wait for the application to start
print_status "Waiting for application to start..."
sleep 10

# Health check
print_status "Performing health check..."
if curl -f http://localhost:3000/api/health > /dev/null 2>&1; then
    print_status "✅ Application is running successfully!"
    print_status "🌐 Application is available at: http://localhost:3000"
else
    print_error "❌ Health check failed. Please check the logs:"
    docker-compose logs
    exit 1
fi

# Show container status
print_status "Container status:"
docker-compose ps

print_status "🎉 Deployment completed successfully!"

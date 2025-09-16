#!/bin/bash

# Cache optimization script for IDE Negócios Digitais
set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_header() {
    echo -e "${BLUE}[CACHE OPTIMIZATION]${NC} $1"
}

# Clear Next.js cache
clear_nextjs_cache() {
    print_header "Clearing Next.js cache..."
    
    if [ -d ".next" ]; then
        rm -rf .next
        print_status "✅ Next.js cache cleared"
    else
        print_status "ℹ️  No Next.js cache found"
    fi
}

# Clear node_modules and reinstall
clear_node_modules() {
    print_header "Clearing node_modules..."
    
    if [ -d "node_modules" ]; then
        rm -rf node_modules
        print_status "✅ node_modules cleared"
    fi
    
    print_status "Reinstalling dependencies..."
    npm install
    print_status "✅ Dependencies reinstalled"
}

# Clear Docker cache
clear_docker_cache() {
    print_header "Clearing Docker cache..."
    
    # Remove unused containers
    docker container prune -f
    print_status "✅ Unused containers removed"
    
    # Remove unused images
    docker image prune -f
    print_status "✅ Unused images removed"
    
    # Remove unused volumes
    docker volume prune -f
    print_status "✅ Unused volumes removed"
    
    # Remove unused networks
    docker network prune -f
    print_status "✅ Unused networks removed"
}

# Optimize build cache
optimize_build_cache() {
    print_header "Optimizing build cache..."
    
    # Create .dockerignore if it doesn't exist
    if [ ! -f ".dockerignore" ]; then
        cat > .dockerignore << EOF
node_modules
.next
.git
.gitignore
README.md
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.DS_Store
*.tsbuildinfo
EOF
        print_status "✅ .dockerignore created"
    fi
    
    # Optimize package-lock.json
    if [ -f "package-lock.json" ]; then
        print_status "✅ package-lock.json is present for faster installs"
    fi
}

# Main optimization function
main() {
    print_header "Starting cache optimization..."
    echo "=================================="
    
    clear_nextjs_cache
    echo ""
    
    clear_node_modules
    echo ""
    
    clear_docker_cache
    echo ""
    
    optimize_build_cache
    echo ""
    
    print_status "🎉 Cache optimization completed!"
    print_status "💡 Run 'npm run build' to test the optimized build"
    
    echo "=================================="
}

# Run main function
main "$@"

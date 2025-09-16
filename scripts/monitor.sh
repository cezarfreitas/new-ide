#!/bin/bash

# Monitoring script for IDE Negócios Digitais
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
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

print_header() {
    echo -e "${BLUE}[MONITOR]${NC} $1"
}

# Check if application is running
check_application() {
    print_header "Checking application status..."
    
    if curl -f http://localhost:3000/api/health > /dev/null 2>&1; then
        print_status "✅ Application is running"
        return 0
    else
        print_error "❌ Application is not responding"
        return 1
    fi
}

# Check Docker containers
check_containers() {
    print_header "Checking Docker containers..."
    
    if docker-compose ps | grep -q "Up"; then
        print_status "✅ Docker containers are running"
        docker-compose ps
    else
        print_error "❌ Docker containers are not running"
        docker-compose ps
        return 1
    fi
}

# Check system resources
check_resources() {
    print_header "Checking system resources..."
    
    # Check memory usage
    MEMORY_USAGE=$(docker stats --no-stream --format "table {{.MemUsage}}" ide-negocios-digitais_ide-negocios-digitais_1 2>/dev/null | tail -n 1 || echo "N/A")
    print_status "Memory usage: $MEMORY_USAGE"
    
    # Check CPU usage
    CPU_USAGE=$(docker stats --no-stream --format "table {{.CPUPerc}}" ide-negocios-digitais_ide-negocios-digitais_1 2>/dev/null | tail -n 1 || echo "N/A")
    print_status "CPU usage: $CPU_USAGE"
    
    # Check disk usage
    DISK_USAGE=$(df -h . | tail -n 1 | awk '{print $5}')
    print_status "Disk usage: $DISK_USAGE"
}

# Check logs for errors
check_logs() {
    print_header "Checking recent logs for errors..."
    
    # Get last 50 lines of logs
    RECENT_LOGS=$(docker-compose logs --tail=50 2>&1)
    
    # Check for common error patterns
    if echo "$RECENT_LOGS" | grep -i "error\|exception\|fatal" > /dev/null; then
        print_warning "⚠️  Errors found in recent logs:"
        echo "$RECENT_LOGS" | grep -i "error\|exception\|fatal" | head -5
    else
        print_status "✅ No errors found in recent logs"
    fi
}

# Performance test
performance_test() {
    print_header "Running performance test..."
    
    # Test response time
    RESPONSE_TIME=$(curl -o /dev/null -s -w '%{time_total}' http://localhost:3000/api/health)
    print_status "Response time: ${RESPONSE_TIME}s"
    
    # Test if response time is acceptable (less than 2 seconds)
    if (( $(echo "$RESPONSE_TIME < 2" | bc -l) )); then
        print_status "✅ Response time is acceptable"
    else
        print_warning "⚠️  Response time is slow (>2s)"
    fi
}

# Main monitoring function
main() {
    print_header "Starting monitoring check..."
    echo "=================================="
    
    local exit_code=0
    
    # Run all checks
    check_application || exit_code=1
    echo ""
    
    check_containers || exit_code=1
    echo ""
    
    check_resources
    echo ""
    
    check_logs
    echo ""
    
    performance_test
    echo ""
    
    # Summary
    if [ $exit_code -eq 0 ]; then
        print_status "🎉 All checks passed! Application is healthy."
    else
        print_error "❌ Some checks failed. Please investigate the issues above."
    fi
    
    echo "=================================="
    exit $exit_code
}

# Run main function
main "$@"

# Deploy script for IDE Negócios Digitais (PowerShell)
param(
    [switch]$SkipBuild,
    [switch]$SkipTests,
    [string]$Environment = "production"
)

Write-Host "🚀 Starting deployment process..." -ForegroundColor Green

# Function to print colored output
function Write-Status {
    param([string]$Message)
    Write-Host "[INFO] $Message" -ForegroundColor Green
}

function Write-Warning {
    param([string]$Message)
    Write-Host "[WARNING] $Message" -ForegroundColor Yellow
}

function Write-Error {
    param([string]$Message)
    Write-Host "[ERROR] $Message" -ForegroundColor Red
}

# Check if Docker is running
try {
    docker info | Out-Null
    Write-Status "Docker is running"
} catch {
    Write-Error "Docker is not running. Please start Docker and try again."
    exit 1
}

# Check if .env file exists
if (-not (Test-Path ".env")) {
    Write-Warning ".env file not found. Creating from env.example..."
    Copy-Item "env.example" ".env"
    Write-Warning "Please update .env file with your actual values before deploying."
}

# Build the application
if (-not $SkipBuild) {
    Write-Status "Building the application..."
    npm run build
    
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Build failed. Please check the errors above."
        exit 1
    }
}

# Build Docker image
Write-Status "Building Docker image..."
docker build -f Dockerfile.production -t ide-negocios-digitais:latest .

if ($LASTEXITCODE -ne 0) {
    Write-Error "Docker build failed. Please check the errors above."
    exit 1
}

# Stop existing container if running
Write-Status "Stopping existing container..."
docker-compose down

# Start the application
Write-Status "Starting the application..."
docker-compose up -d

# Wait for the application to start
Write-Status "Waiting for application to start..."
Start-Sleep -Seconds 10

# Health check
Write-Status "Performing health check..."
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000/api/health" -UseBasicParsing
    if ($response.StatusCode -eq 200) {
        Write-Status "✅ Application is running successfully!"
        Write-Status "🌐 Application is available at: http://localhost:3000"
    } else {
        throw "Health check failed with status code: $($response.StatusCode)"
    }
} catch {
    Write-Error "❌ Health check failed. Please check the logs:"
    docker-compose logs
    exit 1
}

# Show container status
Write-Status "Container status:"
docker-compose ps

Write-Status "🎉 Deployment completed successfully!"

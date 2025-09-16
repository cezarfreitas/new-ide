#!/usr/bin/env node

// Advanced health check script for IDE Negócios Digitais
const http = require('http');
const https = require('https');

// Configuration
const CONFIG = {
  url: process.env.HEALTH_CHECK_URL || 'http://localhost:3000',
  timeout: 5000,
  retries: 3,
  retryDelay: 1000,
};

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function makeRequest(url, timeout = CONFIG.timeout) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const request = protocol.get(url, { timeout }, (response) => {
      let data = '';
      response.on('data', (chunk) => {
        data += chunk;
      });
      response.on('end', () => {
        resolve({
          statusCode: response.statusCode,
          headers: response.headers,
          data: data,
        });
      });
    });

    request.on('error', (error) => {
      reject(error);
    });

    request.on('timeout', () => {
      request.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

async function checkHealth() {
  const startTime = Date.now();
  
  try {
    log('🔍 Checking application health...', 'blue');
    
    const response = await makeRequest(`${CONFIG.url}/api/health`);
    const responseTime = Date.now() - startTime;
    
    if (response.statusCode === 200) {
      log(`✅ Health check passed (${responseTime}ms)`, 'green');
      
      // Parse response if it's JSON
      try {
        const healthData = JSON.parse(response.data);
        log(`📊 Status: ${healthData.status || 'OK'}`, 'green');
        
        if (healthData.uptime) {
          log(`⏱️  Uptime: ${healthData.uptime}`, 'blue');
        }
        
        if (healthData.timestamp) {
          log(`🕐 Timestamp: ${healthData.timestamp}`, 'blue');
        }
      } catch (e) {
        // Response is not JSON, that's okay
        log('📄 Response received (non-JSON)', 'green');
      }
      
      return true;
    } else {
      log(`❌ Health check failed with status: ${response.statusCode}`, 'red');
      return false;
    }
  } catch (error) {
    const responseTime = Date.now() - startTime;
    log(`❌ Health check failed: ${error.message} (${responseTime}ms)`, 'red');
    return false;
  }
}

async function checkMainPage() {
  try {
    log('🌐 Checking main page...', 'blue');
    
    const response = await makeRequest(CONFIG.url);
    const responseTime = Date.now() - Date.now();
    
    if (response.statusCode === 200) {
      log(`✅ Main page accessible (${responseTime}ms)`, 'green');
      return true;
    } else {
      log(`❌ Main page failed with status: ${response.statusCode}`, 'red');
      return false;
    }
  } catch (error) {
    log(`❌ Main page check failed: ${error.message}`, 'red');
    return false;
  }
}

async function runHealthCheck() {
  log('🚀 Starting comprehensive health check...', 'blue');
  log('=====================================', 'blue');
  
  const healthCheck = await checkHealth();
  const mainPageCheck = await checkMainPage();
  
  log('=====================================', 'blue');
  
  if (healthCheck && mainPageCheck) {
    log('🎉 All health checks passed!', 'green');
    process.exit(0);
  } else {
    log('💥 Some health checks failed!', 'red');
    process.exit(1);
  }
}

// Handle command line arguments
if (process.argv.includes('--help') || process.argv.includes('-h')) {
  log('Health Check Script for IDE Negócios Digitais', 'blue');
  log('Usage: node health-check.js [options]', 'blue');
  log('Options:', 'blue');
  log('  --url <url>    Set the health check URL (default: http://localhost:3000)', 'blue');
  log('  --help, -h     Show this help message', 'blue');
  process.exit(0);
}

// Parse URL from command line
const urlIndex = process.argv.indexOf('--url');
if (urlIndex !== -1 && process.argv[urlIndex + 1]) {
  CONFIG.url = process.argv[urlIndex + 1];
}

// Run the health check
runHealthCheck().catch((error) => {
  log(`💥 Health check script failed: ${error.message}`, 'red');
  process.exit(1);
});

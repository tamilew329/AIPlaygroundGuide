// Build steps configuration
const buildSteps = [
    { id: 1, title: '📦 Installing Dependencies', duration: 2000 },
    { id: 2, title: '🔍 Running Linter', duration: 1500 },
    { id: 3, title: '🧪 Running Tests', duration: 3000 },
    { id: 4, title: '🏗️ Building Application', duration: 2500 },
    { id: 5, title: '📝 Generating Documentation', duration: 1800 },
    { id: 6, title: '🚀 Deploying to Server', duration: 2200 }
];

// State management
let currentBuildIndex = 0;
let isBuilding = false;
let buildInterval = null;

// DOM elements
const buildItemsContainer = document.getElementById('buildItems');
const logContent = document.getElementById('logContent');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const clearLogBtn = document.getElementById('clearLogBtn');
const overallStatus = document.getElementById('overallStatus');

// Initialize the interface
function init() {
    renderBuildItems();
    setupEventListeners();
    addLog('System initialized and ready', 'info');
}

// Render build items
function renderBuildItems() {
    buildItemsContainer.innerHTML = '';
    
    buildSteps.forEach((step, index) => {
        const item = document.createElement('div');
        item.className = 'build-item pending';
        item.id = `build-item-${step.id}`;
        
        item.innerHTML = `
            <div class="build-item-header">
                <span class="build-item-title">${step.title}</span>
                <span class="build-item-status pending">Pending</span>
            </div>
            <div class="progress-bar-container">
                <div class="progress-bar" style="width: 0%"></div>
            </div>
        `;
        
        buildItemsContainer.appendChild(item);
    });
}

// Setup event listeners
function setupEventListeners() {
    startBtn.addEventListener('click', startBuild);
    resetBtn.addEventListener('click', resetBuild);
    clearLogBtn.addEventListener('click', clearLog);
}

// Add log entry
function addLog(message, type = 'info') {
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = document.createElement('p');
    logEntry.className = `log-entry ${type}`;
    logEntry.innerHTML = `<span class="timestamp">[${timestamp}]</span>${message}`;
    logContent.appendChild(logEntry);
    logContent.scrollTop = logContent.scrollHeight;
}

// Clear log
function clearLog() {
    logContent.innerHTML = '';
    addLog('Log cleared', 'info');
}

// Update overall status
function updateOverallStatus(status, text) {
    overallStatus.className = `status-badge ${status}`;
    overallStatus.textContent = text;
}

// Start build process
async function startBuild() {
    if (isBuilding) return;
    
    isBuilding = true;
    currentBuildIndex = 0;
    startBtn.disabled = true;
    
    updateOverallStatus('running', '⚡ Building...');
    addLog('=== Build process started ===', 'info');
    
    for (let i = 0; i < buildSteps.length; i++) {
        currentBuildIndex = i;
        const step = buildSteps[i];
        
        try {
            await executeBuildStep(step);
        } catch (error) {
            handleBuildError(step, error);
            return;
        }
    }
    
    completeBuild();
}

// Execute a single build step
function executeBuildStep(step) {
    return new Promise((resolve, reject) => {
        const item = document.getElementById(`build-item-${step.id}`);
        const statusSpan = item.querySelector('.build-item-status');
        const progressBar = item.querySelector('.progress-bar');
        
        // Update to running state
        item.className = 'build-item running';
        statusSpan.className = 'build-item-status running';
        statusSpan.textContent = 'Running...';
        addLog(`Started: ${step.title}`, 'info');
        
        // Simulate progress
        let progress = 0;
        const progressInterval = setInterval(() => {
            progress += 100 / (step.duration / 50);
            if (progress > 100) progress = 100;
            progressBar.style.width = `${progress}%`;
        }, 50);
        
        // Randomly decide if step should fail (10% chance)
        const shouldFail = Math.random() < 0.05;
        
        setTimeout(() => {
            clearInterval(progressInterval);
            
            if (shouldFail) {
                item.className = 'build-item error';
                statusSpan.className = 'build-item-status error';
                statusSpan.textContent = '❌ Failed';
                progressBar.style.width = '100%';
                addLog(`Failed: ${step.title}`, 'error');
                reject(new Error(`Build step failed: ${step.title}`));
            } else {
                item.className = 'build-item completed';
                statusSpan.className = 'build-item-status completed';
                statusSpan.textContent = '✅ Completed';
                progressBar.style.width = '100%';
                addLog(`Completed: ${step.title}`, 'success');
                resolve();
            }
        }, step.duration);
    });
}

// Handle build error
function handleBuildError(step, error) {
    isBuilding = false;
    startBtn.disabled = false;
    updateOverallStatus('error', '❌ Build Failed');
    addLog('=== Build process failed ===', 'error');
    addLog(error.message, 'error');
}

// Complete build
function completeBuild() {
    isBuilding = false;
    startBtn.disabled = false;
    updateOverallStatus('completed', '✅ Build Completed');
    addLog('=== Build process completed successfully! ===', 'success');
}

// Reset build
function resetBuild() {
    if (isBuilding) {
        addLog('Cannot reset while build is running', 'warning');
        return;
    }
    
    currentBuildIndex = 0;
    renderBuildItems();
    updateOverallStatus('', 'Ready');
    addLog('Build reset', 'info');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', init);

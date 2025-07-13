// Update current time every second
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('th-TH', { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
    });
    document.getElementById('current-time').textContent = timeString;
}

updateTime();
setInterval(updateTime, 1000);

// Mode switching buttons
const manualModeBtn = document.getElementById('manual-mode');
const autoModeBtn = document.getElementById('auto-mode');
const manualContent = document.getElementById('manual-content');
const autoContent = document.getElementById('auto-content');

manualModeBtn.addEventListener('click', () => {
    manualModeBtn.classList.add('mode-toggle');
    autoModeBtn.classList.remove('mode-toggle');
    manualModeBtn.classList.remove('text-gray-300');
    autoModeBtn.classList.add('text-gray-300');
    manualContent.classList.remove('hidden');
    autoContent.classList.add('hidden');
});

autoModeBtn.addEventListener('click', () => {
    autoModeBtn.classList.add('mode-toggle');
    manualModeBtn.classList.remove('mode-toggle');
    autoModeBtn.classList.remove('text-gray-300');
    manualModeBtn.classList.add('text-gray-300');
    autoContent.classList.remove('hidden');
    manualContent.classList.add('hidden');
    startAutoMode();
});

// Relay button toggle logic
document.querySelectorAll('.relay-button').forEach(button => {
    button.addEventListener('click', function() {
        const isActive = this.classList.contains('active');
        const statusText = this.parentElement.querySelector('.status-text');
        
        if (isActive) {
            // Turn OFF
            this.classList.remove('active');
            this.classList.add('inactive');
            this.classList.remove('bg-green-500', 'hover:bg-green-400');
            this.classList.add('bg-red-500', 'hover:bg-red-400');
            statusText.textContent = 'OFF';
            statusText.classList.remove('text-green-400');
            statusText.classList.add('text-red-400');
        } else {
            // Turn ON
            this.classList.remove('inactive');
            this.classList.add('active');
            this.classList.remove('bg-red-500', 'hover:bg-red-400');
            this.classList.add('bg-green-500', 'hover:bg-green-400');
            statusText.textContent = 'ON';
            statusText.classList.remove('text-red-400');
            statusText.classList.add('text-green-400');
        }
    });
});

// Demo automatic mode simulation
let autoInterval;

function startAutoMode() {
    if (autoInterval) clearInterval(autoInterval);
    
    autoInterval = setInterval(() => {
        const now = new Date();
        const currentTime = now.getHours() * 60 + now.getMinutes();

        // Relay 1 ON between 8:00 and 8:30
        const relay1On = currentTime >= 480 && currentTime <= 510;

        // Only update in auto mode
        if (!manualContent.classList.contains('hidden')) return;

        // ตัวอย่างสมมติเปิด/ปิด relay 1 ในหน้า manual
        const relay1Btn = document.querySelector('.relay-control[data-relay="1"] .relay-button');
        const statusText = relay1Btn.parentElement.querySelector('.status-text');

        if (relay1On) {
            if (!relay1Btn.classList.contains('active')) {
                relay1Btn.classList.add('active');
                relay1Btn.classList.remove('inactive');
                relay1Btn.classList.remove('bg-red-500', 'hover:bg-red-400');
                relay1Btn.classList.add('bg-green-500', 'hover:bg-green-400');
                statusText.textContent = 'ON';
                statusText.classList.remove('text-red-400');
                statusText.classList.add('text-green-400');
            }
        } else {
            if (!relay1Btn.classList.contains('inactive')) {
                relay1Btn.classList.add('inactive');
                relay1Btn.classList.remove('active');
                relay1Btn.classList.remove('bg-green-500', 'hover:bg-green-400');
                relay1Btn.classList.add('bg-red-500', 'hover:bg-red-400');
                statusText.textContent = 'OFF';
                statusText.classList.remove('text-green-400');
                statusText.classList.add('text-red-400');
            }
        }

        // เพิ่มลอจิกสำหรับรีเลย์อื่น ๆ ตามต้องการ
    }, 1000);
}

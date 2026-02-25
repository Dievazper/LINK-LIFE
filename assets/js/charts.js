// ECG Simulator Configuration
document.addEventListener('DOMContentLoaded', () => {

    const ecgCanvas = document.getElementById('ecgChart');
    if (!ecgCanvas) return;

    // ECG wave pattern base (a complete heartbeat cycle)
    const baseWave = [0, 0, 0, 0.1, 0.2, 0, 0, 0, -0.2, 1, -0.3, 0, 0, 0.2, 0.3, 0.2, 0, 0, 0, 0, 0, 0, 0];
    const waveLength = baseWave.length;

    let timeIndex = 0;
    const maxDataPoints = 150;

    const dataVals = Array(maxDataPoints).fill(0);
    const labelsVals = Array(maxDataPoints).fill('');

    Chart.defaults.color = 'rgba(255, 255, 255, 0.6)';
    Chart.defaults.font.family = '"Inter", sans-serif';

    const ctx = ecgCanvas.getContext('2d');

    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(50, 215, 75, 0.5)'); // --ecg-normal
    gradient.addColorStop(1, 'rgba(50, 215, 75, 0.0)');

    const ecgChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labelsVals,
            datasets: [{
                label: 'ECG Signal (mV)',
                data: dataVals,
                borderColor: '#32d74b',
                borderWidth: 2,
                tension: 0.4,
                pointRadius: 0,
                fill: true,
                backgroundColor: gradient
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: false,
            plugins: {
                legend: { display: false },
                tooltip: { enabled: false }
            },
            scales: {
                x: {
                    display: false
                },
                y: {
                    display: true,
                    min: -1,
                    max: 2,
                    grid: {
                        color: 'rgba(255,255,255,0.05)',
                        drawBorder: false
                    },
                    ticks: {
                        display: false
                    }
                }
            }
        }
    });

    // Update interval
    setInterval(() => {
        // Find index in base pattern
        let patternVal = baseWave[timeIndex % waveLength];

        // Add minimal noise
        let noise = (Math.random() - 0.5) * 0.05;
        let finalVal = patternVal + noise;

        dataVals.push(finalVal);
        dataVals.shift(); // remove oldest

        // Randomly fluctuate heart rate display ~ 70-75
        if (timeIndex % waveLength === 10) { // Heartbeat spike roughly
            const hrElem = document.getElementById('hrValue');
            if (hrElem) {
                let currentHR = parseInt(hrElem.innerText);
                let diff = Math.floor(Math.random() * 5) - 2; // -2 to +2
                let newHR = Math.max(65, Math.min(85, currentHR + diff));
                hrElem.innerHTML = newHR + ' <span class="metric-unit">BPM</span>';
            }
        }

        ecgChart.update();
        timeIndex++;
    }, 40); // 40ms per point -> ~ 25 points per second
});

// Investor Logic
document.addEventListener('DOMContentLoaded', () => {

    // 1. Chart.js Initialization
    const revCanvas = document.getElementById('revenueChart');
    if (revCanvas) {
        Chart.defaults.color = 'rgba(255, 255, 255, 0.6)';
        Chart.defaults.font.family = '"Inter", sans-serif';

        const ctx = revCanvas.getContext('2d');
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, 'rgba(50, 215, 75, 0.4)');
        gradient.addColorStop(1, 'rgba(50, 215, 75, 0.0)');

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'],
                datasets: [{
                    label: 'ARR Projection (€ Millions)',
                    data: [12, 45, 120, 280, 550],  // €9.99/mo ~ €120/yr. 1M users = 120M ARR.
                    backgroundColor: gradient,
                    borderColor: '#32d74b',
                    borderWidth: 1,
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(255,255,255,0.05)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    // 2. ROI Calculator Logic
    const investAmountInput = document.getElementById('investAmount');
    const userSlider = document.getElementById('userSlider');
    const userCountDisplay = document.getElementById('userCountDisplay');
    const roiResult = document.getElementById('roiResult');
    const valuationResult = document.getElementById('valuationResult');

    if (investAmountInput && userSlider) {
        const calculateROI = () => {
            const investment = parseFloat(investAmountInput.value) || 0;
            const users = parseFloat(userSlider.value) || 0;

            // Formatter
            userCountDisplay.innerText = users.toLocaleString() + ' users';

            // Very basic startup math simulation
            // ARR per user = ~€120/year
            // Valuation multiple = 5x ARR
            const arr = users * 120;
            const projectedValuation = arr * 5;

            // Initial valuation is €100M post-money
            const ownershipPercentage = investment / 100000000;

            // Value of ownership at Year 3 exit
            const finalValue = projectedValuation * ownershipPercentage;

            // ROI %
            let roiPercentage = 0;
            if (investment > 0) {
                roiPercentage = ((finalValue - investment) / investment) * 100;
            }

            roiResult.innerText = Math.round(roiPercentage).toLocaleString() + '%';

            if (projectedValuation >= 1000000000) {
                valuationResult.innerText = '€' + (projectedValuation / 1000000000).toFixed(2) + 'B';
                valuationResult.style.color = 'var(--ecg-normal)'; // Unicorn status!
            } else {
                valuationResult.innerText = '€' + Math.round(projectedValuation / 1000000).toLocaleString() + 'M';
                valuationResult.style.color = 'inherit';
            }
        };

        investAmountInput.addEventListener('input', calculateROI);
        userSlider.addEventListener('input', calculateROI);

        // Initial run
        calculateROI();
    }
});

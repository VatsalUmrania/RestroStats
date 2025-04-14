import { useEffect, useRef } from 'react';
import { Chart } from 'chart.js';

const SalesChart = () => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        // Destroy the previous chart if it exists
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        // Initialize the new chart
        if (chartRef.current) {
            const ctx = chartRef.current.getContext('2d');
            chartInstance.current = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    datasets: [{
                        label: 'Daily Sales',
                        data: [650, 590, 800, 810, 5560, 3550, 4400],
                        borderColor: '#6366f1',
                        tension: 0.4,
                        fill: true, // Optional: adds area under the line
                        backgroundColor: 'rgba(99, 102, 241, 0.2)' // Light background
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                color: '#6366f1',
                                callback: (value) => `₹${value}`
                            },
                            grid: {
                                color: 'rgba(255, 255, 255, 0.1)'
                            }
                        },
                        x: {
                            ticks: {
                                color: '#6366f1'
                            },
                            grid: {
                                color: 'rgba(241, 245, 249, 0.1)'
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            display: true,
                            labels: {
                                color: '#6366f1'
                            }
                        }
                    }
                }
            });
        }

        // Cleanup on unmount
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, []);

    return <canvas ref={chartRef} id="salesChart" style={{ width: '100%', height: '400px' }}></canvas>;
};

export default SalesChart;

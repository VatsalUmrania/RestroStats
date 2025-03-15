document.addEventListener("DOMContentLoaded", function () {
    // Initialize charts
    const salesTrendsCtx = document.getElementById("salesTrendsChart").getContext("2d");
    const revenueBreakdownCtx = document.getElementById("revenueBreakdownChart").getContext("2d");
    const customerDemographicsCtx = document.getElementById("customerDemographicsChart").getContext("2d");

    // Store chart instances globally
    window.salesTrendsChart = new Chart(salesTrendsCtx, {
        type: "line",
        data: {
            labels: [,"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
            datasets: [{
                label: "Sales",
                data: [5000, 7000, 6000, 8000, 9000, 12000, 11000],
                borderColor: "#4a90e2",
                backgroundColor: "rgba(74, 144, 226, 0.1)",
                borderWidth: 2,
                fill: true,
            }],
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: "bottom",
                },
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: "rgba(255, 255, 255, 0.1)",
                    },
                },
                x: {
                    grid: {
                        color: "rgba(0, 0, 0, 0.1)",
                    },
                },
            },
        },
    });

    window.revenueBreakdownChart = new Chart(revenueBreakdownCtx, {
        type: "pie",
        data: {
            labels: ["Food", "Beverages", "Desserts"],
            datasets: [{
                label: "Revenue",
                data: [12000, 8000, 4000],
                backgroundColor: ["#4a90e2", "#ff6b6b", "#7f8c8d"],
                borderWidth: 1,
            }],
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: "top",
                },
            },
        },
    });

    window.customerDemographicsChart = new Chart(customerDemographicsCtx, {
        type: "bar",
        data: {
            labels: ["18-24", "25-34", "35-44", "45-54", "55+"],
            datasets: [{
                label: "Customers",
                data: [200, 500, 300, 150, 100],
                backgroundColor: "rgba(74, 144, 226, 0.1)",
                borderColor:"#4a90e2",
                borderWidth: 2,
                fill:true
            }],
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: "top",
                },
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: "rgba(255, 255, 255, 0.1)",
                    },
                },
                x: {
                    grid: {
                        color: "rgba(255, 255, 255, 0.1)",
                    },
                },
            },
        },
    });
});

// Function to change chart type
function changeChartType(chartId, newType) {
    const chart = window[chartId]; // Get the chart instance
    if (chart) {
        chart.config.type = newType; // Update the chart type
        chart.update(); // Re-render the chart
    }
}
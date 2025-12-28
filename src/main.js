import './style.css'
import ApexCharts from 'apexcharts'
import { createIcons, icons } from 'lucide'

// Initialize Icons
createIcons({ icons });

// Sales Dynamic Chart
const options = {
    series: [{
        name: "Revenue",
        data: [60, 50, 60, 55, 60, 65, 50, 70, 65, 75, 55, 60] // Random-ish curve
    }, {
        name: "Leads",
        data: [40, 30, 45, 35, 40, 30, 40, 50, 40, 45, 35, 40]
    }],
    chart: {
        type: 'area',
        height: '100%',
        width: '100%',
        toolbar: { show: false },
        zoom: { enabled: false },
        parentHeightOffset: 0
    },
    colors: ['#F43F5E', '#E2E8F0'], // Rose-500, Slate-200
    fill: {
        type: 'gradient',
        gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.3,
            opacityTo: 0.05,
            stops: [0, 90, 100]
        }
    },
    dataLabels: { enabled: false },
    stroke: {
        curve: 'smooth',
        width: [3, 2],
        dashArray: [0, 0]
    },
    xaxis: {
        categories: ['W 1', 'W 2', 'W 3', 'W 4', 'W 5', 'W 6', 'W 7', 'W 8', 'W 9', 'W 10', 'W 11', 'W 12'],
        labels: {
            style: {
                colors: '#94A3B8',
                fontSize: '10px',
                fontFamily: 'inherit'
            }
        },
        axisBorder: { show: false },
        axisTicks: { show: false },
        tooltip: { enabled: false }
    },
    yaxis: { show: false },
    grid: {
        show: true,
        borderColor: '#F1F5F9',
        strokeDashArray: 0,
        xaxis: { lines: { show: true } },
        yaxis: { lines: { show: false } },
        padding: { top: 0, right: 0, bottom: 0, left: 10 }
    },
    legend: { show: false },
    markers: {
        size: [4, 0],
        colors: ['#F43F5E'],
        strokeColors: '#fff',
        strokeWidth: 2,
        hover: { size: 6 }
    },
    tooltip: {
        theme: 'light',
        y: { formatter: function (val) { return "$" + val + "k" } }
    }
};

const chartEl = document.querySelector("#sales-dynamic-chart");
if (chartEl) {
    const chart = new ApexCharts(chartEl, options);
    chart.render();
}

// Mobile Sidebar Toggle
const menuBtn = document.querySelector('#mobile-menu-btn');
const sidebar = document.querySelector('#sidebar');
const backdrop = document.querySelector('#sidebar-backdrop');
let isSidebarOpen = false;

function toggleSidebar() {
    isSidebarOpen = !isSidebarOpen;
    if (isSidebarOpen) {
        // Open
        sidebar.classList.remove('-translate-x-full');
        backdrop.classList.remove('hidden');
        // Small delay to allow display:block to apply before opacity transition
        setTimeout(() => {
            backdrop.classList.remove('opacity-0');
        }, 10);
    } else {
        // Close
        sidebar.classList.add('-translate-x-full');
        backdrop.classList.add('opacity-0');
        setTimeout(() => {
            backdrop.classList.add('hidden');
        }, 300); // Match transition duration
    }
}

if (menuBtn && sidebar && backdrop) {
    menuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleSidebar();
    });

    backdrop.addEventListener('click', () => {
        if (isSidebarOpen) toggleSidebar();
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isSidebarOpen) toggleSidebar();
    });
}

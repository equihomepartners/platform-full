import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ScaleOptions,
  ChartOptions
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Professional, distinct color palette
export const chartColors = {
  // Primary colors for pie charts - more distinct professional colors
  pieColors: [
    '#1E40AF', // Deep Blue
    '#047857', // Forest Green
    '#7C3AED', // Royal Purple
    '#B91C1C', // Deep Red
    '#C2410C', // Burnt Orange
    '#0369A1', // Ocean Blue
  ],
  
  // Colors for bar charts
  barColors: {
    positive: '#047857',  // Professional Green
    negative: '#B91C1C',  // Professional Red
  },
  
  // Colors for line charts
  lineColors: {
    primary: '#1E40AF',    // Deep Blue
    secondary: '#047857',  // Forest Green
    tertiary: '#7C3AED',   // Royal Purple
  },
  
  // Map colors - more sophisticated
  mapColors: {
    marker: 'rgba(30, 64, 175, 0.7)',     // Semi-transparent Deep Blue
    markerBorder: '#1E40AF',              // Deep Blue border
    highlight: 'rgba(30, 64, 175, 0.9)'   // Highlighted state
  },
  
  // Background and accent colors
  background: '#F8FAFC',   // Off-white
  gridLines: '#E2E8F0',    // Light gray
  text: '#1E293B',         // Dark gray
  textSecondary: '#64748B' // Medium gray
};

// Define proper types for scale options
export const defaultScaleOptions = {
  y: {
    type: 'linear' as const,
    beginAtZero: true,
    grid: {
      color: '#E2E8F0',
      drawBorder: false,
    },
    ticks: {
      font: {
        size: 12
      },
      color: '#64748B',
      callback: (value: number) => `${value}%`
    }
  },
  x: {
    type: 'category' as const,
    grid: {
      display: false
    },
    ticks: {
      font: {
        size: 12
      },
      color: '#64748B'
    }
  }
};

// Common chart options with proper typing
export const commonOptions: ChartOptions<'bar' | 'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        padding: 20,
        usePointStyle: true,
        pointStyle: 'circle',
        font: {
          family: 'Inter, system-ui, sans-serif',
          size: 12,
          weight: '500'
        },
        color: '#1E293B'
      }
    },
    tooltip: {
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      titleColor: '#1E293B',
      bodyColor: '#475569',
      borderColor: '#E2E8F0',
      borderWidth: 1,
      padding: 12,
      cornerRadius: 4,
      bodyFont: {
        family: 'Inter, system-ui, sans-serif',
        size: 12
      },
      titleFont: {
        family: 'Inter, system-ui, sans-serif',
        size: 13,
        weight: '600'
      }
    }
  },
  scales: defaultScaleOptions
};
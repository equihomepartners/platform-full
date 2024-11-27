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
  ChartOptions,
  Scale,
  CoreScaleOptions
} from 'chart.js';

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

export const chartColors = {
  pieColors: [
    '#1E40AF', // Deep Blue
    '#047857', // Forest Green
    '#7C3AED', // Royal Purple
    '#B91C1C', // Deep Red
    '#C2410C', // Burnt Orange
    '#0369A1', // Ocean Blue
  ],
  barColors: {
    positive: '#047857',
    negative: '#B91C1C',
  },
  lineColors: {
    primary: '#1E40AF',
    secondary: '#047857',
    tertiary: '#7C3AED',
  },
  mapColors: {
    marker: 'rgba(30, 64, 175, 0.7)',
    markerBorder: '#1E40AF',
    highlight: 'rgba(30, 64, 175, 0.9)'
  },
  background: '#F8FAFC',
  gridLines: '#E2E8F0',
  text: '#1E293B',
  textSecondary: '#64748B'
};

export const defaultScaleOptions = {
  y: {
    type: 'linear' as const,
    beginAtZero: true,
    grid: {
      color: '#E2E8F0',
    },
    border: {
      display: false
    },
    ticks: {
      font: {
        size: 12
      },
      color: '#64748B',
      callback: function(this: Scale<CoreScaleOptions>, value: number | string) {
        return `${value}%`;
      }
    }
  },
  x: {
    type: 'category' as const,
    grid: {
      display: false
    },
    border: {
      display: false
    },
    ticks: {
      font: {
        size: 12
      },
      color: '#64748B'
    }
  }
} as const;

export const commonOptions: ChartOptions<'bar' | 'line' | 'scatter'> = {
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
          weight: 500
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
        weight: 500
      }
    }
  },
  scales: defaultScaleOptions
};
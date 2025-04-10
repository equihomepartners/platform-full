// Common chart configuration options
export const commonOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        font: {
          family: 'Inter, sans-serif',
          size: 12
        },
        padding: 20,
        usePointStyle: true,
        boxWidth: 6
      }
    },
    tooltip: {
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      titleColor: '#111827',
      bodyColor: '#4B5563',
      borderColor: '#E5E7EB',
      borderWidth: 1,
      padding: 12,
      boxPadding: 6,
      usePointStyle: true,
      bodyFont: {
        family: 'Inter, sans-serif'
      },
      titleFont: {
        family: 'Inter, sans-serif',
        weight: 'bold'
      }
    }
  },
  scales: {
    x: {
      grid: {
        display: false
      },
      ticks: {
        font: {
          family: 'Inter, sans-serif',
          size: 11
        }
      }
    },
    y: {
      grid: {
        borderDash: [2, 4],
        color: '#E5E7EB'
      },
      ticks: {
        font: {
          family: 'Inter, sans-serif',
          size: 11
        },
        padding: 10
      }
    }
  },
  elements: {
    line: {
      tension: 0.3
    },
    point: {
      radius: 3,
      hoverRadius: 5
    }
  }
};

// Color schemes for charts
export const colorSchemes = {
  primary: [
    'rgba(79, 70, 229, 1)',   // Indigo
    'rgba(16, 185, 129, 1)',  // Green
    'rgba(245, 158, 11, 1)',  // Amber
    'rgba(239, 68, 68, 1)',   // Red
    'rgba(59, 130, 246, 1)'   // Blue
  ],
  pastel: [
    'rgba(79, 70, 229, 0.7)',
    'rgba(16, 185, 129, 0.7)',
    'rgba(245, 158, 11, 0.7)',
    'rgba(239, 68, 68, 0.7)',
    'rgba(59, 130, 246, 0.7)'
  ],
  background: [
    'rgba(79, 70, 229, 0.1)',
    'rgba(16, 185, 129, 0.1)',
    'rgba(245, 158, 11, 0.1)',
    'rgba(239, 68, 68, 0.1)',
    'rgba(59, 130, 246, 0.1)'
  ]
};

// Preset chart configurations
export const presets = {
  performance: {
    ...commonOptions,
    plugins: {
      ...commonOptions.plugins,
      title: {
        display: true,
        text: 'Performance Metrics',
        font: {
          family: 'Inter, sans-serif',
          size: 16,
          weight: 'bold'
        },
        padding: {
          top: 10,
          bottom: 30
        }
      }
    }
  },
  comparison: {
    ...commonOptions,
    plugins: {
      ...commonOptions.plugins,
      title: {
        display: true,
        text: 'Market Comparison',
        font: {
          family: 'Inter, sans-serif',
          size: 16,
          weight: 'bold'
        },
        padding: {
          top: 10,
          bottom: 30
        }
      }
    }
  }
};

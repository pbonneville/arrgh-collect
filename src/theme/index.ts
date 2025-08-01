'use client';

import { createTheme, ThemeOptions } from '@mui/material/styles';

// Define common theme options
const commonThemeOptions: ThemeOptions = {
  typography: {
    fontFamily: 'var(--font-geist-sans), Arial, Helvetica, sans-serif',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: {
      fontSize: '3.75rem', // text-6xl
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '1.25rem', // text-xl
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h3: {
      fontSize: '1.125rem', // text-lg
      fontWeight: 600,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem', // text-sm
      lineHeight: 1.5,
    },
  },
  shape: {
    borderRadius: 8, // rounded-lg equivalent
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // Prevent uppercase transformation
          fontWeight: 600,
          borderRadius: 8,
          transition: 'all 0.2s ease-in-out',
        },
        sizeLarge: {
          fontSize: '1.125rem', // text-lg
          padding: '12px 32px', // py-3 px-8
        },
        sizeMedium: {
          padding: '8px 16px', // py-2 px-4
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          transition: 'box-shadow 0.2s ease-in-out',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
};

// Light theme
const lightTheme = createTheme({
  ...commonThemeOptions,
  palette: {
    mode: 'light',
    primary: {
      main: '#2563eb', // blue-600
      light: '#3b82f6', // blue-500
      dark: '#1d4ed8', // blue-700
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#10b981', // green-500
      light: '#34d399', // green-400
      dark: '#059669', // green-600
      contrastText: '#ffffff',
    },
    error: {
      main: '#dc2626', // red-600
      light: '#ef4444', // red-500
      dark: '#b91c1c', // red-700
    },
    warning: {
      main: '#d97706', // amber-600
      light: '#f59e0b', // amber-500
      dark: '#b45309', // amber-700
    },
    info: {
      main: '#0891b2', // cyan-600
      light: '#06b6d4', // cyan-500
      dark: '#0e7490', // cyan-700
    },
    success: {
      main: '#10b981', // green-500
      light: '#34d399', // green-400
      dark: '#059669', // green-600
    },
    background: {
      default: '#ffffff', // white
      paper: '#ffffff', // white
    },
    text: {
      primary: '#111827', // gray-900
      secondary: '#6b7280', // gray-500
    },
    divider: '#e5e7eb', // gray-200
    grey: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    },
  },
});

// Dark theme
const darkTheme = createTheme({
  ...commonThemeOptions,
  palette: {
    mode: 'dark',
    primary: {
      main: '#3b82f6', // blue-500
      light: '#60a5fa', // blue-400
      dark: '#2563eb', // blue-600
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#34d399', // green-400
      light: '#6ee7b7', // green-300
      dark: '#10b981', // green-500
      contrastText: '#000000',
    },
    error: {
      main: '#ef4444', // red-500
      light: '#f87171', // red-400
      dark: '#dc2626', // red-600
    },
    warning: {
      main: '#f59e0b', // amber-500
      light: '#fbbf24', // amber-400
      dark: '#d97706', // amber-600
    },
    info: {
      main: '#06b6d4', // cyan-500
      light: '#22d3ee', // cyan-400
      dark: '#0891b2', // cyan-600
    },
    success: {
      main: '#34d399', // green-400
      light: '#6ee7b7', // green-300
      dark: '#10b981', // green-500
    },
    background: {
      default: '#0a0a0a', // Very dark background (from globals.css)
      paper: '#1f2937', // gray-800
    },
    text: {
      primary: '#ededed', // Light text (from globals.css)
      secondary: '#9ca3af', // gray-400
    },
    divider: '#374151', // gray-700
    grey: {
      50: '#111827',
      100: '#1f2937',
      200: '#374151',
      300: '#4b5563',
      400: '#6b7280',
      500: '#9ca3af',
      600: '#d1d5db',
      700: '#e5e7eb',
      800: '#f3f4f6',
      900: '#f9fafb',
    },
  },
});

export { lightTheme, darkTheme };
export default lightTheme;
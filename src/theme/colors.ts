export const colors = {
  // Primary colors
  primary: '#007AFF', // iOS blue
  primaryDark: '#0062CC',
  primaryLight: '#4D9FFF',

  // Secondary colors (vibrant accents)
  secondary: '#FF2D55', // iOS pink
  secondaryDark: '#CC2444',
  secondaryLight: '#FF7088',

  // Accent colors
  accent1: '#5AC8FA', // Light blue
  accent2: '#FF9500', // Orange
  accent3: '#34C759', // Green
  accent4: '#AF52DE', // Purple

  // Neutrals
  background: '#FFFFFF',
  card: '#F8F8F8',
  surface: '#FFFFFF',
  border: '#E0E0E0',
  
  // Text
  text: '#000000',
  textSecondary: '#636366',
  textTertiary: '#AEAEB2',
  
  // Status
  success: '#34C759',
  error: '#FF3B30',
  warning: '#FF9500',
  info: '#5AC8FA',

  // Utils
  transparent: 'transparent',
  overlay: 'rgba(0, 0, 0, 0.5)',
};

export type ColorNames = keyof typeof colors; 
